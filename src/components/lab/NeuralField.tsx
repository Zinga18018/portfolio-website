'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useLabControls } from './LabControls'
import StaticNeuralFallback from './StaticNeuralFallback'

const pointVertexShader = `
  attribute float aSeed;
  attribute float aDropSeed;
  uniform float uTime;
  uniform float uTemperature;
  uniform float uDensity;
  uniform float uDropout;
  uniform float uPixelRatio;
  varying float vVisible;
  varying float vHeat;

  void main() {
    float densityMask = step(1.0 - uDensity, aSeed);
    float dropoutMask = step(uDropout, aDropSeed);
    vVisible = densityMask * dropoutMask;
    vHeat = clamp((uTemperature - 0.2) / 1.4, 0.0, 1.0);

    vec3 shifted = position;
    float energy = max(uTemperature - 0.2, 0.0);
    shifted.x += sin(uTime * 0.18 + aSeed * 31.0) * energy * 0.045;
    shifted.y += cos(uTime * 0.15 + aSeed * 23.0) * energy * 0.045;
    shifted.z += sin(uTime * 0.11 + aSeed * 17.0) * energy * 0.035;

    vec4 viewPosition = modelViewMatrix * vec4(shifted, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = vVisible * (2.1 + uTemperature * 1.25) * uPixelRatio * (8.0 / max(1.0, -viewPosition.z));
  }
`

const pointFragmentShader = `
  uniform vec3 uBone;
  uniform vec3 uAmber;
  varying float vVisible;
  varying float vHeat;

  void main() {
    if (vVisible < 0.5) discard;
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    if (distanceFromCenter > 0.5) discard;
    float core = 1.0 - smoothstep(0.06, 0.5, distanceFromCenter);
    float halo = 1.0 - smoothstep(0.24, 0.5, distanceFromCenter);
    vec3 color = mix(uBone, uAmber, vHeat * 0.62);
    gl_FragColor = vec4(color, core * 0.72 + halo * 0.18);
  }
`

const lineVertexShader = `
  attribute float aSeed;
  attribute float aDropSeed;
  uniform float uDensity;
  uniform float uDropout;
  varying float vVisible;

  void main() {
    float densityMask = step(1.0 - uDensity, aSeed);
    float dropoutMask = step(uDropout, aDropSeed);
    vVisible = densityMask * dropoutMask;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const lineFragmentShader = `
  uniform vec3 uLineColor;
  uniform float uTemperature;
  varying float vVisible;

  void main() {
    if (vVisible < 0.5) discard;
    gl_FragColor = vec4(uLineColor, 0.07 + uTemperature * 0.035);
  }
`

function seededRandom(seed: number) {
  let value = seed >>> 0
  return () => {
    value += 0x6D2B79F5
    let result = value
    result = Math.imul(result ^ (result >>> 15), result | 1)
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61)
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}

function buildNetwork(compact: boolean) {
  const random = seededRandom(compact ? 18018 : 202612)
  const layerSizes = compact ? [34, 48, 56, 56, 44, 30] : [70, 96, 116, 116, 86, 56]
  const nodes: Array<[number, number, number]> = []
  const seeds: number[] = []
  const dropoutSeeds: number[] = []
  const layers: number[][] = []

  layerSizes.forEach((size, layerIndex) => {
    const layer: number[] = []
    const x = -7.2 + (14.4 * layerIndex) / (layerSizes.length - 1)
    for (let index = 0; index < size; index += 1) {
      layer.push(nodes.length)
      nodes.push([x + (random() - 0.5) * 0.34, (random() - 0.5) * 7.6, (random() - 0.5) * 2.8])
      seeds.push(random())
      dropoutSeeds.push(random())
    }
    layers.push(layer)
  })

  const linePositions: number[] = []
  const lineSeeds: number[] = []
  const lineDropoutSeeds: number[] = []
  let connectionCount = 0
  for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex += 1) {
    const current = layers[layerIndex]
    const next = layers[layerIndex + 1]
    for (const sourceIndex of current) {
      for (let link = 0; link < 2; link += 1) {
        if (!compact && connectionCount >= 900) break
        const targetIndex = next[Math.floor(random() * next.length)]
        const segmentSeed = Math.min(seeds[sourceIndex], seeds[targetIndex])
        const segmentDropoutSeed = Math.min(dropoutSeeds[sourceIndex], dropoutSeeds[targetIndex])
        linePositions.push(...nodes[sourceIndex], ...nodes[targetIndex])
        lineSeeds.push(segmentSeed, segmentSeed)
        lineDropoutSeeds.push(segmentDropoutSeed, segmentDropoutSeed)
        connectionCount += 1
      }
    }
  }

  return {
    positions: new Float32Array(nodes.flat()),
    seeds: new Float32Array(seeds),
    dropoutSeeds: new Float32Array(dropoutSeeds),
    linePositions: new Float32Array(linePositions),
    lineSeeds: new Float32Array(lineSeeds),
    lineDropoutSeeds: new Float32Array(lineDropoutSeeds),
  }
}

function NeuralGraph({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pointsMaterial = useRef<THREE.ShaderMaterial>(null)
  const linesMaterial = useRef<THREE.ShaderMaterial>(null)
  const scrollProgress = useRef(0)
  const { settings } = useLabControls()
  const { size, gl, invalidate } = useThree()
  const compact = size.width < 720
  const network = useMemo(() => buildNetwork(compact), [compact])

  useEffect(() => {
    const updateScroll = () => {
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scrollProgress.current = window.scrollY / range
    }
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => invalidate(), [settings, reducedMotion, invalidate])

  useFrame((state, delta) => {
    const time = reducedMotion ? 0 : state.clock.elapsedTime
    if (pointsMaterial.current) {
      pointsMaterial.current.uniforms.uTime.value = time
      pointsMaterial.current.uniforms.uTemperature.value = settings.temperature
      pointsMaterial.current.uniforms.uDensity.value = settings.nodeDensity
      pointsMaterial.current.uniforms.uDropout.value = settings.dropout
      pointsMaterial.current.uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 1.5)
    }
    if (linesMaterial.current) {
      linesMaterial.current.uniforms.uTemperature.value = settings.temperature
      linesMaterial.current.uniforms.uDensity.value = settings.nodeDensity
      linesMaterial.current.uniforms.uDropout.value = settings.dropout
    }
    if (!group.current || reducedMotion) return
    const pointerX = state.pointer.x * 0.055
    const pointerY = state.pointer.y * 0.035
    group.current.rotation.y += delta * (0.025 + settings.temperature * 0.012)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointerY + scrollProgress.current * 0.08, 0.035)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointerX * 0.45, 0.03)
  })

  return (
    <group ref={group} rotation={[0.08, -0.2, -0.04]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[network.linePositions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[network.lineSeeds, 1]} />
          <bufferAttribute attach="attributes-aDropSeed" args={[network.lineDropoutSeeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={linesMaterial}
          vertexShader={lineVertexShader}
          fragmentShader={lineFragmentShader}
          transparent
          depthWrite={false}
          uniforms={{
            uDensity: { value: settings.nodeDensity },
            uDropout: { value: settings.dropout },
            uTemperature: { value: settings.temperature },
            uLineColor: { value: new THREE.Color('#b8b4a8') },
          }}
        />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[network.positions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[network.seeds, 1]} />
          <bufferAttribute attach="attributes-aDropSeed" args={[network.dropoutSeeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pointsMaterial}
          vertexShader={pointVertexShader}
          fragmentShader={pointFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uTemperature: { value: settings.temperature },
            uDensity: { value: settings.nodeDensity },
            uDropout: { value: settings.dropout },
            uPixelRatio: { value: 1 },
            uBone: { value: new THREE.Color('#e8e1d0') },
            uAmber: { value: new THREE.Color('#d69b46') },
          }}
        />
      </points>
    </group>
  )
}

function StaticField() {
  const { settings } = useLabControls()
  return <StaticNeuralFallback opacity={0.22 + settings.nodeDensity * 0.38} />
}

export default function NeuralField({ reducedMotion }: { reducedMotion: boolean }) {
  const [webglSupported] = useState(() => {
    if (typeof document === 'undefined') return false
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  })

  if (reducedMotion || webglSupported !== true) return <StaticField />

  return (
    <Canvas
      className="neural-canvas"
      camera={{ position: [0, 0, 11.5], fov: 52 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <NeuralGraph reducedMotion={reducedMotion} />
    </Canvas>
  )
}

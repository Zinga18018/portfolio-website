const nodes = [
  [90, 150], [95, 330], [90, 560], [265, 105], [280, 235], [255, 420], [285, 650],
  [485, 150], [500, 300], [475, 520], [500, 690], [710, 95], [725, 240], [700, 430],
  [730, 620], [930, 160], [955, 335], [925, 555], [1120, 230], [1100, 485],
] as const

const edges = [
  [0,3], [0,4], [1,4], [1,5], [2,5], [2,6], [3,7], [3,8], [4,7], [4,8], [4,9],
  [5,8], [5,9], [5,10], [6,9], [6,10], [7,11], [7,12], [8,12], [8,13], [9,13],
  [9,14], [10,14], [11,15], [12,15], [12,16], [13,16], [13,17], [14,17], [15,18],
  [16,18], [16,19], [17,19],
] as const

export default function StaticNeuralFallback({ opacity = .42, contrast = 1 }: { opacity?: number; contrast?: number }) {
  return (
    <svg className="static-neural-field" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" style={{ opacity, filter: `contrast(${contrast})` }} aria-hidden="true">
      <g className="fallback-edges">
        {edges.map(([from, to]) => <line key={`${from}-${to}`} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} />)}
      </g>
      <g className="fallback-nodes">
        {nodes.map(([cx, cy], index) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index % 5 === 0 ? 3.2 : 2.2} />)}
      </g>
    </svg>
  )
}

export type StanceKey = 'supportive' | 'neutral' | 'society' | 'government';
export type PhaseKey = 'pre' | 'acute' | 'sustained' | 'retrospective' | 'unknown';

export type CaseMetric = {
  name: string;
  year: number;
  rows: number;
  share: number;
  dominant: StanceKey;
  gap: number;
  peak: string;
  peakCount: number;
  stance: Record<StanceKey, number>;
  phase: Record<PhaseKey, number>;
};

export const headlineMetrics = {
  publicRows: 351501,
  caseRows: 130858,
  caseCount: 16,
  generalRows: 219641,
  redditRows: 328199,
  youtubeRows: 23302,
};

export const stanceTotals = [
  { key: 'supportive' as const, label: 'Supportive of victim', value: 7055, color: 'teal' },
  { key: 'neutral' as const, label: 'Neutral reporting', value: 115370, color: 'blue' },
  { key: 'society' as const, label: 'Critical of society', value: 163819, color: 'amber' },
  { key: 'government' as const, label: 'Critical of government', value: 65257, color: 'berry' },
];

export const phaseTotals = [
  { key: 'pre' as const, label: 'Pre-event', value: 8482 },
  { key: 'acute' as const, label: 'Acute', value: 15300 },
  { key: 'sustained' as const, label: 'Sustained', value: 24105 },
  { key: 'retrospective' as const, label: 'Retrospective', value: 78343 },
  { key: 'unknown' as const, label: 'Unknown', value: 5630 },
];

export const yearlyVolume = [
  { year: '2012', value: 2199 },
  { year: '2013', value: 9300 },
  { year: '2014', value: 7415 },
  { year: '2015', value: 8503 },
  { year: '2016', value: 9167 },
  { year: '2017', value: 9325 },
  { year: '2018', value: 19310 },
  { year: '2019', value: 22001 },
  { year: '2020', value: 30640 },
  { year: '2021', value: 26328 },
  { year: '2022', value: 28673 },
  { year: '2023', value: 32170 },
  { year: '2024', value: 72577 },
  { year: '2025', value: 27465 },
  { year: '2026', value: 15393 },
];

export const caseMetrics: CaseMetric[] = [
  { name: 'Nirbhaya', year: 2012, rows: 35517, share: 27.14, dominant: 'neutral', gap: 20.71, peak: '2026-02', peakCount: 1604, stance: { supportive: 5.44, neutral: 38.89, society: 36.33, government: 19.34 }, phase: { pre: 0.52, acute: 5.12, sustained: 12.11, retrospective: 80.15, unknown: 2.11 } },
  { name: 'Manipur', year: 2023, rows: 15250, share: 11.65, dominant: 'neutral', gap: 30.91, peak: '2024-03', peakCount: 2154, stance: { supportive: 2.71, neutral: 40.64, society: 26.12, government: 30.52 }, phase: { pre: 15.73, acute: 15.93, sustained: 28.26, retrospective: 32.86, unknown: 7.21 } },
  { name: 'Hathras', year: 2020, rows: 14297, share: 10.93, dominant: 'government', gap: 34.2, peak: '2020-10', peakCount: 2521, stance: { supportive: 2.35, neutral: 34.1, society: 22.84, government: 40.71 }, phase: { pre: 3.74, acute: 24.12, sustained: 17.26, retrospective: 52.89, unknown: 2 } },
  { name: 'Kathua', year: 2018, rows: 14082, share: 10.76, dominant: 'neutral', gap: 31.64, peak: '2018-04', peakCount: 1710, stance: { supportive: 4.54, neutral: 46.55, society: 25.39, government: 23.51 }, phase: { pre: 1.95, acute: 4.27, sustained: 25.06, retrospective: 66.62, unknown: 2.1 } },
  { name: 'RG Kar', year: 2024, rows: 9981, share: 7.63, dominant: 'government', gap: 28.8, peak: '2024-08', peakCount: 3426, stance: { supportive: 6.89, neutral: 23.92, society: 32.92, government: 36.27 }, phase: { pre: 8.43, acute: 32.5, sustained: 36.63, retrospective: 11.23, unknown: 11.21 } },
  { name: 'Unnao', year: 2017, rows: 9113, share: 6.96, dominant: 'neutral', gap: 40.06, peak: '2026-01', peakCount: 993, stance: { supportive: 3.6, neutral: 42.35, society: 16.98, government: 37.08 }, phase: { pre: 0.74, acute: 0.66, sustained: 9.66, retrospective: 86.22, unknown: 2.73 } },
  { name: 'Badlapur', year: 2024, rows: 5937, share: 4.54, dominant: 'neutral', gap: 31.15, peak: '2026-02', peakCount: 667, stance: { supportive: 3.47, neutral: 53.73, society: 25.89, government: 16.91 }, phase: { pre: 35.15, acute: 12.78, sustained: 18.02, retrospective: 33.03, unknown: 1.01 } },
  { name: 'Hyderabad Vet', year: 2019, rows: 5194, share: 3.97, dominant: 'neutral', gap: 35.27, peak: '2019-12', peakCount: 450, stance: { supportive: 5.97, neutral: 48.29, society: 21.78, government: 23.97 }, phase: { pre: 9.34, acute: 15.46, sustained: 24.26, retrospective: 41.49, unknown: 9.45 } },
  { name: 'Pollachi', year: 2019, rows: 4849, share: 3.71, dominant: 'neutral', gap: 28.21, peak: '2026-02', peakCount: 506, stance: { supportive: 6.08, neutral: 51.23, society: 30.98, government: 11.71 }, phase: { pre: 12.54, acute: 6.04, sustained: 4.35, retrospective: 76.24, unknown: 0.82 } },
  { name: 'Sandeshkhali', year: 2024, rows: 3720, share: 2.84, dominant: 'government', gap: 35.53, peak: '2024-03', peakCount: 467, stance: { supportive: 1.34, neutral: 26.24, society: 23.87, government: 48.55 }, phase: { pre: 10.4, acute: 25.08, sustained: 40.13, retrospective: 15.99, unknown: 8.39 } },
  { name: 'Badaun', year: 2014, rows: 3424, share: 2.62, dominant: 'society', gap: 16.39, peak: '2014-05', peakCount: 239, stance: { supportive: 4.59, neutral: 37.15, society: 40.65, government: 17.61 }, phase: { pre: 1.87, acute: 2.86, sustained: 0.82, retrospective: 87.59, unknown: 6.86 } },
  { name: 'Shakti Mills', year: 2013, rows: 2898, share: 2.21, dominant: 'neutral', gap: 18.31, peak: '2026-02', peakCount: 285, stance: { supportive: 5.07, neutral: 42.34, society: 39.48, government: 13.11 }, phase: { pre: 11.66, acute: 4.76, sustained: 5.66, retrospective: 72.57, unknown: 5.35 } },
  { name: 'Uber Delhi', year: 2014, rows: 2637, share: 2.02, dominant: 'neutral', gap: 23.16, peak: '2014-12', peakCount: 257, stance: { supportive: 4.1, neutral: 48.16, society: 35.38, government: 12.36 }, phase: { pre: 0.83, acute: 11.45, sustained: 6.11, retrospective: 76.22, unknown: 5.38 } },
  { name: 'Bhavana Assault', year: 2017, rows: 1634, share: 1.25, dominant: 'society', gap: 24.05, peak: '2026-01', peakCount: 295, stance: { supportive: 15.06, neutral: 28.7, society: 32.99, government: 23.26 }, phase: { pre: 0.18, acute: 0.37, sustained: 3.79, retrospective: 75.76, unknown: 19.89 } },
  { name: 'Jisha', year: 2016, rows: 1261, share: 0.96, dominant: 'neutral', gap: 27.94, peak: '2026-02', peakCount: 159, stance: { supportive: 3.41, neutral: 51.39, society: 29.1, government: 16.1 }, phase: { pre: 4.52, acute: 4.92, sustained: 4.2, retrospective: 85.88, unknown: 0.48 } },
  { name: 'Shraddha Walkar', year: 2022, rows: 1064, share: 0.81, dominant: 'neutral', gap: 27.81, peak: '2026-02', peakCount: 267, stance: { supportive: 3.29, neutral: 51.13, society: 29.23, government: 16.35 }, phase: { pre: 4.51, acute: 7.14, sustained: 31.58, retrospective: 54.61, unknown: 2.16 } },
];

export const stanceLabels: Record<StanceKey, string> = {
  supportive: 'Supportive of victim',
  neutral: 'Neutral reporting',
  society: 'Critical of society',
  government: 'Critical of government',
};

export const phaseLabels: Record<PhaseKey, string> = {
  pre: 'Pre-event',
  acute: 'Acute',
  sustained: 'Sustained',
  retrospective: 'Retrospective',
  unknown: 'Unknown',
};

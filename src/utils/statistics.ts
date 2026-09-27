/**
 * Real Statistical Computation Utilities for SIGMA Institute
 */

// Abramowitz and Stegun approximation for erf
export function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

// Standard Normal CDF: Φ(z)
export function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

// Normal Probability Density Function (PDF)
export function normalPDF(x: number, mean = 0, stdDev = 1): number {
  if (stdDev <= 0) return 0;
  const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
}

// Student's t distribution approximation (gamma function ratio)
function logGamma(z: number): number {
  // Lanczos approximation
  const g = 7;
  const c = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) {
    x += c[i] / (z + i);
  }
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

export function studentTPDF(x: number, df: number): number {
  if (df <= 0) return 0;
  const num = Math.exp(logGamma((df + 1) / 2));
  const den = Math.sqrt(df * Math.PI) * Math.exp(logGamma(df / 2));
  return (num / den) * Math.pow(1 + (x * x) / df, -(df + 1) / 2);
}

// Inverse standard normal (probit function) approximation
export function probit(p: number): number {
  if (p <= 0) return -4.5;
  if (p >= 1) return 4.5;
  if (p === 0.5) return 0;
  
  // Rational approximation by Beasley and Springer, improved by Moro
  const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
  const b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833];
  const c = [
    0.3374754822726147,
    0.9761690190917186,
    0.1607979714918209,
    0.0276438810333863,
    0.0038405729373609,
    0.0003951896511919,
    0.0000321767881768,
    0.0000002888167364,
    0.0000003960315187
  ];

  const y = p - 0.5;
  if (Math.abs(y) < 0.42) {
    const r = y * y;
    const x = y * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]) / ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
    return x;
  }

  let r = p;
  if (y > 0) r = 1 - p;
  r = Math.log(-Math.log(r));
  let x = c[0];
  for (let i = 1; i < 9; i++) {
    x += c[i] * Math.pow(r, i);
  }
  return y < 0 ? -x : x;
}

// Ordinary Least Squares Linear Regression
export interface RegressionResult {
  slope: number;
  intercept: number;
  r2: number;
  r: number;
  mse: number;
  pValue: number;
  residuals: number[];
  standardErrorSlope: number;
}

export function computeOLS(points: Array<{ x: number; y: number }>): RegressionResult {
  const n = points.length;
  if (n < 2) {
    return { slope: 0, intercept: 0, r2: 0, r: 0, mse: 0, pValue: 1, residuals: [], standardErrorSlope: 0 };
  }

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
  for (const pt of points) {
    sumX += pt.x;
    sumY += pt.y;
    sumXY += pt.x * pt.y;
    sumX2 += pt.x * pt.x;
    sumY2 += pt.y * pt.y;
  }

  const denominator = n * sumX2 - sumX * sumX;
  if (Math.abs(denominator) < 1e-10) {
    return { slope: 0, intercept: sumY / n, r2: 0, r: 0, mse: 0, pValue: 1, residuals: [], standardErrorSlope: 0 };
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  // Calculate R^2 and residuals
  const meanY = sumY / n;
  let ssTot = 0;
  let ssRes = 0;
  const residuals: number[] = [];

  for (const pt of points) {
    const yPred = slope * pt.x + intercept;
    const res = pt.y - yPred;
    residuals.push(res);
    ssRes += res * res;
    ssTot += Math.pow(pt.y - meanY, 2);
  }

  const r2 = ssTot === 0 ? 0 : Math.max(0, Math.min(1, 1 - ssRes / ssTot));
  const r = (slope >= 0 ? 1 : -1) * Math.sqrt(r2);
  const mse = ssRes / Math.max(1, n - 2);
  
  // Standard error of slope
  const sxx = sumX2 - (sumX * sumX) / n;
  const standardErrorSlope = sxx > 0 ? Math.sqrt(mse / sxx) : 0;
  const tStat = standardErrorSlope > 0 ? Math.abs(slope / standardErrorSlope) : 0;
  
  // Quick p-value approximation via standard normal for n >= 2
  const pValue = Math.max(0.0001, 2 * (1 - normalCDF(tStat)));

  return {
    slope,
    intercept,
    r2,
    r,
    mse,
    pValue,
    residuals,
    standardErrorSlope
  };
}

// Markov Chain Steady State via Power Iteration
export function computeMarkovSteadyState(matrix: number[][], maxIter = 80): number[] {
  const n = matrix.length;
  if (n === 0) return [];
  
  // Uniform initial distribution
  let v = new Array(n).fill(1 / n);

  for (let iter = 0; iter < maxIter; iter++) {
    const nextV = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        nextV[j] += v[i] * matrix[i][j];
      }
    }
    // Normalize
    const sum = nextV.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      for (let j = 0; j < n; j++) {
        nextV[j] /= sum;
      }
    }
    v = nextV;
  }
  return v;
}

// Summary Statistics Helper
export function calculateDescriptiveStats(numbers: number[]) {
  const n = numbers.length;
  if (n === 0) {
    return { mean: 0, stdDev: 0, skewness: 0, kurtosis: 3, median: 0, iqr: 0, min: 0, max: 0 };
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  const mean = sum / n;

  let sumSqDiff = 0;
  let sumCubeDiff = 0;
  let sumQuadDiff = 0;

  for (const val of sorted) {
    const d = val - mean;
    sumSqDiff += d * d;
    sumCubeDiff += d * d * d;
    sumQuadDiff += d * d * d * d;
  }

  const variance = sumSqDiff / Math.max(1, n - 1);
  const stdDev = Math.sqrt(variance);

  const skewness = stdDev > 0 ? (sumCubeDiff / n) / Math.pow(stdDev, 3) : 0;
  const kurtosis = stdDev > 0 ? (sumQuadDiff / n) / Math.pow(stdDev, 4) : 3;

  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const iqr = q3 - q1;

  return {
    mean: Number(mean.toFixed(3)),
    stdDev: Number(stdDev.toFixed(3)),
    skewness: Number(skewness.toFixed(3)),
    kurtosis: Number(kurtosis.toFixed(3)),
    median: Number(median.toFixed(3)),
    iqr: Number(iqr.toFixed(3)),
    min: Number(sorted[0].toFixed(3)),
    max: Number(sorted[n - 1].toFixed(3))
  };
}

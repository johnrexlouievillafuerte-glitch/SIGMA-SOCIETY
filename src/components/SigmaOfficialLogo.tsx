import { useCustomization } from '../context/CustomizationContext';

interface SigmaOfficialLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'full' | 'watermark' | 'monochrome' | 'gold';
  opacity?: number;
  customSrc?: string;
}

export default function SigmaOfficialLogo({
  className = '',
  size = 64,
  variant = 'full',
  opacity,
  customSrc
}: SigmaOfficialLogoProps) {
  let contextLogoUrl = '';
  try {
    const ctx = useCustomization();
    contextLogoUrl = ctx?.logosConfig?.sigmaLogoUrl || '';
  } catch {
    // Context may not be initialized in isolated tests
  }

  const effectiveSrc = customSrc || contextLogoUrl;

  if (effectiveSrc) {
    return (
      <img
        src={effectiveSrc}
        alt="SIGMA Official Logo"
        width={size}
        height={size}
        style={opacity !== undefined ? { opacity, width: size, height: size } : { width: size, height: size }}
        className={`rounded-full object-contain select-none ${className}`}
      />
    );
  }

  const isWatermark = variant === 'watermark';
  const isGold = variant === 'gold';
  const isMonochrome = variant === 'monochrome';

  // Base theme colors
  const primaryMaroon = isGold ? '#781523' : isMonochrome ? '#380a11' : isWatermark ? '#6e111f' : '#520d18';
  const ringMaroon = isGold ? '#5a0d18' : isMonochrome ? '#26040a' : isWatermark ? '#4f0a14' : '#420811';
  const darkMaroon = isGold ? '#3d070f' : isMonochrome ? '#160205' : isWatermark ? '#35050d' : '#2d040a';
  const accentColor = isGold ? '#facc15' : isWatermark ? '#fbbf24' : '#ffffff';
  const goldColor = '#facc15';

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={`select-none ${className}`}
      style={opacity !== undefined ? { opacity } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <radialGradient id="maroonSealGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6e1322" />
          <stop offset="70%" stopColor={primaryMaroon} />
          <stop offset="100%" stopColor={darkMaroon} />
        </radialGradient>

        <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>

        {/* Circular path for the text */}
        {/* Radius 205, center at 250,250 */}
        <path
          id="upperTextArc"
          d="M 55,250 A 195,195 0 1,1 445,250"
          fill="none"
        />
        <path
          id="lowerTextArc"
          d="M 445,250 A 195,195 0 0,1 55,250"
          fill="none"
        />

        {/* Subtle drop shadow */}
        <filter id="sealShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Main Outer Seal Background */}
      <circle
        cx="250"
        cy="250"
        r="240"
        fill="url(#maroonSealGrad)"
        stroke={accentColor}
        strokeWidth={isWatermark ? "3" : "6"}
        filter={!isWatermark ? "url(#sealShadow)" : undefined}
      />

      {/* Outer Ring Accent Line */}
      <circle
        cx="250"
        cy="250"
        r="230"
        fill="none"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.7"
      />

      {/* Inner Boundary Ring for the Text Ribbon */}
      <circle
        cx="250"
        cy="250"
        r="178"
        fill={ringMaroon}
        stroke={accentColor}
        strokeWidth="3.5"
      />
      <circle
        cx="250"
        cy="250"
        r="170"
        fill="none"
        stroke={accentColor}
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Curving Text on Ring: STATISTICAL INNOVATION AND GROWTH IN MATHEMATICAL ADVANCEMENT */}
      <text
        fill={accentColor}
        fontSize="16.5"
        fontFamily="sans-serif"
        fontWeight="800"
        letterSpacing="2.5"
        textAnchor="middle"
      >
        <textPath href="#upperTextArc" startOffset="50%">
          ★ STATISTICAL INNOVATION AND GROWTH IN MATHEMATICAL ADVANCEMENT ★
        </textPath>
      </text>

      {/* Center Field Inner Circle */}
      <circle
        cx="250"
        cy="250"
        r="165"
        fill="url(#maroonSealGrad)"
      />

      {/* Subtle Coordinate Grid in upper half */}
      <g opacity="0.15" stroke={accentColor} strokeWidth="0.8">
        <line x1="110" y1="130" x2="390" y2="130" />
        <line x1="110" y1="160" x2="390" y2="160" />
        <line x1="110" y1="190" x2="390" y2="190" />
        <line x1="150" y1="100" x2="150" y2="220" />
        <line x1="200" y1="100" x2="200" y2="220" />
        <line x1="250" y1="100" x2="250" y2="220" />
        <line x1="300" y1="100" x2="300" y2="220" />
        <line x1="350" y1="100" x2="350" y2="220" />
      </g>

      {/* ================= UPPER SECTION: GAUSSIAN BELL CURVE ================= */}
      {/* Normal Distribution Bell Curve in background */}
      <path
        d="M 140,210 
           C 180,210 200,205 220,150 
           C 235,110 245,100 250,98 
           C 255,100 265,110 280,150 
           C 300,205 320,210 360,210"
        fill="none"
        stroke={accentColor}
        strokeWidth="2.5"
        opacity="0.9"
      />
      {/* Shaded Bell Curve Area */}
      <path
        d="M 140,210 
           C 180,210 200,205 220,150 
           C 235,110 245,100 250,98 
           C 255,100 265,110 280,150 
           C 300,205 320,210 360,210 Z"
        fill={accentColor}
        opacity="0.1"
      />

      {/* ================= 3D ASCENDING BAR CHART (LEFT) ================= */}
      <g stroke={accentColor} strokeWidth="2" fill="none">
        {/* Bar 1 */}
        <polygon points="120,220 120,195 136,190 136,220" fill={accentColor} fillOpacity="0.25" />
        <polygon points="120,195 128,188 144,183 136,190" fill={accentColor} fillOpacity="0.4" />
        <polygon points="136,190 144,183 144,213 136,220" fill={accentColor} fillOpacity="0.3" />

        {/* Bar 2 */}
        <polygon points="142,220 142,175 160,168 160,220" fill={accentColor} fillOpacity="0.3" />
        <polygon points="142,175 152,168 170,161 160,168" fill={accentColor} fillOpacity="0.45" />
        <polygon points="160,168 170,161 170,213 160,220" fill={accentColor} fillOpacity="0.35" />

        {/* Bar 3 */}
        <polygon points="168,220 168,155 188,146 188,220" fill={accentColor} fillOpacity="0.35" />
        <polygon points="168,155 180,147 200,139 188,146" fill={accentColor} fillOpacity="0.5" />
        <polygon points="188,146 200,139 200,213 188,220" fill={accentColor} fillOpacity="0.4" />

        {/* Bar 4 */}
        <polygon points="198,220 198,135 220,125 220,220" fill={accentColor} fillOpacity="0.4" />
        <polygon points="198,135 212,126 234,116 220,125" fill={accentColor} fillOpacity="0.55" />
        <polygon points="220,125 234,116 234,211 220,220" fill={accentColor} fillOpacity="0.45" />
      </g>

      {/* Upward Growth Arrow swooping across the bars */}
      <path
        d="M 125,230 
           Q 190,195 245,130 
           L 240,118 L 270,125 L 262,154 L 253,142 
           Q 200,205 130,236 Z"
        fill="url(#arrowGrad)"
        stroke={darkMaroon}
        strokeWidth="1"
        filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.5))"
      />

      {/* ================= GREEK SYMBOLS & STOCHASTIC GRAPH (RIGHT) ================= */}
      {/* Greek letters Σ and π */}
      <text
        x="310"
        y="160"
        fill={accentColor}
        fontFamily="'Space Grotesk', serif"
        fontSize="54"
        fontWeight="bold"
      >
        Σ
      </text>
      <text
        x="354"
        y="178"
        fill={accentColor}
        fontFamily="'Space Grotesk', serif"
        fontSize="44"
        fontWeight="bold"
      >
        π
      </text>

      {/* Stochastic Graph / Connected Data Points (Right) */}
      <g stroke={accentColor} strokeWidth="2.5" fill={accentColor}>
        <polyline
          points="255,195 285,175 305,185 330,195 355,188 385,200"
          fill="none"
        />
        <circle cx="255" cy="195" r="4.5" />
        <circle cx="285" cy="175" r="4.5" />
        <circle cx="305" cy="185" r="4.5" />
        <circle cx="330" cy="195" r="4.5" />
        <circle cx="355" cy="188" r="4.5" />
        <circle cx="385" cy="200" r="4.5" />
      </g>

      {/* ================= CENTER RIBBON / BANNER ================= */}
      {/* Banner Background */}
      <g filter="url(#sealShadow)">
        <path
          d="M 75,260 
             L 90,235 L 410,235 L 425,260 L 410,285 L 90,285 Z"
          fill={darkMaroon}
          stroke={accentColor}
          strokeWidth="3"
        />
        {/* Banner Inner Trim */}
        <path
          d="M 88,242 L 412,242 L 420,260 L 412,278 L 88,278 L 80,260 Z"
          fill={primaryMaroon}
          stroke={accentColor}
          strokeWidth="1.2"
        />
        {/* Text: SIGMA SOCIETY */}
        <text
          x="250"
          y="271"
          fill={accentColor}
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="33"
          fontWeight="900"
          letterSpacing="4"
          textAnchor="middle"
        >
          SIGMA SOCIETY
        </text>
      </g>

      {/* ================= LOWER PORTION: FORMULA & STOCHASTIC NODES ================= */}
      {/* Mathematical text: x² f(x) */}
      <text
        x="200"
        y="325"
        fill={accentColor}
        fontFamily="serif"
        fontStyle="italic"
        fontSize="34"
        fontWeight="bold"
        textAnchor="middle"
      >
        x² f(x)
      </text>

      {/* Connected Graph on lower right */}
      <g stroke={accentColor} strokeWidth="2.5" fill={accentColor}>
        <polyline
          points="270,335 295,300 325,320 350,295"
          fill="none"
        />
        <circle cx="270" cy="335" r="4" />
        <circle cx="295" cy="300" r="4" />
        <circle cx="325" cy="320" r="4" />
        <circle cx="350" cy="295" r="4" />
      </g>

      {/* ================= BOTTOM: OPEN BOOK ================= */}
      <g filter="url(#sealShadow)">
        {/* Book Base Plate / Glow */}
        <ellipse cx="250" cy="390" rx="140" ry="24" fill={darkMaroon} stroke={accentColor} strokeWidth="1.5" />

        {/* Left Open Pages */}
        <path
          d="M 250,380 
             C 210,365 170,368 135,372 
             C 142,352 180,346 250,362 Z"
          fill="#f8fafc"
          stroke={darkMaroon}
          strokeWidth="1.2"
        />
        <path
          d="M 250,380 
             C 210,360 170,362 130,366 
             C 137,346 178,340 250,356 Z"
          fill="#e2e8f0"
          stroke={darkMaroon}
          strokeWidth="1.2"
        />
        <path
          d="M 250,380 
             C 210,355 170,356 125,360 
             C 132,340 175,334 250,350 Z"
          fill="#ffffff"
          stroke={darkMaroon}
          strokeWidth="1.5"
        />

        {/* Right Open Pages */}
        <path
          d="M 250,380 
             C 290,365 330,368 365,372 
             C 358,352 320,346 250,362 Z"
          fill="#f8fafc"
          stroke={darkMaroon}
          strokeWidth="1.2"
        />
        <path
          d="M 250,380 
             C 290,360 330,362 370,366 
             C 363,346 322,340 250,356 Z"
          fill="#e2e8f0"
          stroke={darkMaroon}
          strokeWidth="1.2"
        />
        <path
          d="M 250,380 
             C 290,355 330,356 375,360 
             C 368,340 325,334 250,350 Z"
          fill="#ffffff"
          stroke={darkMaroon}
          strokeWidth="1.5"
        />

        {/* Book Spine Center line */}
        <line x1="250" y1="350" x2="250" y2="384" stroke={primaryMaroon} strokeWidth="3" />

        {/* Subtle text lines on left page */}
        <g stroke="#94a3b8" strokeWidth="1.2" opacity="0.6">
          <line x1="150" y1="352" x2="235" y2="347" />
          <line x1="155" y1="358" x2="235" y2="353" />
          <line x1="160" y1="364" x2="230" y2="359" />
        </g>
        {/* Subtle text lines on right page */}
        <g stroke="#94a3b8" strokeWidth="1.2" opacity="0.6">
          <line x1="265" y1="347" x2="350" y2="352" />
          <line x1="265" y1="353" x2="345" y2="358" />
          <line x1="270" y1="359" x2="340" y2="364" />
        </g>
      </g>
    </svg>
  );
}

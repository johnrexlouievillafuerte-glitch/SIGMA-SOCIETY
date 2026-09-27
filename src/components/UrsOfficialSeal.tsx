import { useCustomization } from '../context/CustomizationContext';

interface UrsOfficialSealProps {
  className?: string;
  size?: number | string;
  customSrc?: string;
}

export default function UrsOfficialSeal({ className = '', size = 52, customSrc }: UrsOfficialSealProps) {
  let contextSealUrl = '';
  try {
    const ctx = useCustomization();
    contextSealUrl = ctx?.logosConfig?.ursSealUrl || '';
  } catch {
    // Context may not be initialized in isolated tests
  }

  const effectiveSrc = customSrc || contextSealUrl;

  if (effectiveSrc) {
    return (
      <img
        src={effectiveSrc}
        alt="University of Rizal System Seal"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={`rounded-full object-contain select-none ${className}`}
      />
    );
  }
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ursBlueGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <path
          id="ursUpperArc"
          d="M 25,100 A 75,75 0 1,1 175,100"
          fill="none"
        />
        <path
          id="ursLowerArc"
          d="M 175,100 A 75,75 0 0,1 25,100"
          fill="none"
        />
      </defs>

      {/* Outer Blue Circle */}
      <circle cx="100" cy="100" r="95" fill="url(#ursBlueGrad)" stroke="#fbbf24" strokeWidth="3" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 2" />
      
      {/* Inner Boundary Ring */}
      <circle cx="100" cy="100" r="70" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />

      {/* Ring Text: UNIVERSITY OF RIZAL SYSTEM */}
      <text
        fill="#ffffff"
        fontSize="10"
        fontFamily="sans-serif"
        fontWeight="800"
        letterSpacing="1.2"
        textAnchor="middle"
      >
        <textPath href="#ursUpperArc" startOffset="50%">
          UNIVERSITY OF RIZAL SYSTEM
        </textPath>
      </text>

      {/* Year: 2001 */}
      <text
        fill="#fbbf24"
        fontSize="9"
        fontFamily="sans-serif"
        fontWeight="800"
        letterSpacing="2"
        textAnchor="middle"
      >
        <textPath href="#ursLowerArc" startOffset="50%">
          ★ 2001 ★
        </textPath>
      </text>

      {/* Central Emblem Graphics: Globe, Gear, Torch */}
      {/* Globe Lat/Long lines */}
      <circle cx="100" cy="100" r="45" fill="#1e40af" stroke="#60a5fa" strokeWidth="1.2" opacity="0.6" />
      <ellipse cx="100" cy="100" rx="22" ry="45" fill="none" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
      <line x1="55" y1="100" x2="145" y2="100" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
      <line x1="100" y1="55" x2="100" y2="145" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />

      {/* Golden Industrial Gear / Cog in center-bottom */}
      <circle cx="100" cy="118" r="16" fill="none" stroke="#fbbf24" strokeWidth="3.5" strokeDasharray="4 3" />
      <circle cx="100" cy="118" r="9" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="1.5" />

      {/* Flame & Torch of Knowledge in center */}
      {/* Torch Handle */}
      <polygon points="98,135 102,135 103,105 97,105" fill="#d97706" stroke="#fbbf24" strokeWidth="0.8" />
      {/* Torch Bowl */}
      <polygon points="94,105 106,105 103,98 97,98" fill="#fbbf24" />
      {/* Glowing Torch Flame */}
      <path
        d="M 100,74 
           C 95,84 92,90 95,98 
           C 98,100 102,100 105,98 
           C 108,90 105,84 100,74 Z"
        fill="#f59e0b"
        stroke="#ffffff"
        strokeWidth="0.8"
      />
      <path
        d="M 100,80 
           C 97,87 96,91 98,96 
           C 100,97 101,97 102,96 
           C 104,91 103,87 100,80 Z"
        fill="#fef08a"
      />

      {/* Laurel Leaves left & right */}
      <path
        d="M 70,120 Q 64,100 75,85"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
      />
      <path
        d="M 130,120 Q 136,100 125,85"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
      />
    </svg>
  );
}

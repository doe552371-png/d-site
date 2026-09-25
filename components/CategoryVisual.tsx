import type { ReactNode } from "react";

type CategoryVisualProps = {
  slug: string;
};

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f2]">
      <svg
        viewBox="0 0 800 600"
        role="img"
        aria-hidden="true"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="surface" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#ecece8" />
            <stop offset="1" stopColor="#d9d9d4" />
          </linearGradient>
          <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dccdb4" />
            <stop offset="0.6" stopColor="#b8a281" />
            <stop offset="1" stopColor="#8f7a5c" />
          </linearGradient>
          <linearGradient id="stone" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d8d7d1" />
            <stop offset="1" stopColor="#a9aaa5" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#777770" floodOpacity="0.2" />
          </filter>
        </defs>

        <rect x="0" y="0" width="800" height="600" fill="#f5f5f2" />
        <ellipse cx="405" cy="480" rx="235" ry="34" fill="#d7d7d2" opacity="0.45" />

        {children}
      </svg>
    </div>
  );
}

export default function CategoryVisual({ slug }: CategoryVisualProps) {
  switch (slug) {
    case "moldings":
      return (
        <Frame>
          <g filter="url(#shadow)">
            <path
              d="M160 360h480v74H160z"
              fill="url(#surface)"
              stroke="#c8c8c2"
              strokeWidth="2"
            />
            <path
              d="M190 360v-34h420v34M220 326v-28h360v28M250 298v-24h300v24"
              fill="none"
              stroke="#bdbdb6"
              strokeWidth="12"
              strokeLinejoin="round"
            />
            <path
              d="M190 374h420"
              stroke="#ffffff"
              strokeWidth="6"
              opacity="0.8"
            />
          </g>
        </Frame>
      );

    case "shadow-baseboards":
    case "baseboards":
      return (
        <Frame>
          <g filter="url(#shadow)">
            <path
              d="M205 175h365v270H205z"
              fill="url(#surface)"
              stroke="#c6c6c0"
              strokeWidth="2"
            />
            <path
              d="M205 175h92l-18 270h-74z"
              fill="#ffffff"
              opacity="0.72"
            />
            <path
              d="M205 395h365"
              stroke="#c0c0b9"
              strokeWidth="10"
            />
            <path
              d="M205 415h365"
              stroke="#ffffff"
              strokeWidth="5"
              opacity="0.8"
            />
          </g>
        </Frame>
      );

    case "cornices":
      return (
        <Frame>
          <g filter="url(#shadow)">
            <path
              d="M190 170h390v72H326v168h-76V242h-60z"
              fill="url(#surface)"
              stroke="#c5c5bf"
              strokeWidth="2"
            />
            <path
              d="M190 194h142M274 242v168"
              stroke="#ffffff"
              strokeWidth="7"
              opacity="0.75"
            />
            <path
              d="M326 242h254"
              stroke="#b6b6b0"
              strokeWidth="8"
              opacity="0.65"
            />
          </g>
        </Frame>
      );

    case "baguettes":
      return (
        <Frame>
          <g filter="url(#shadow)">
            <path
              d="M210 404V220h52v142h142v52H210z"
              fill="url(#surface)"
              stroke="#c7c7c1"
              strokeWidth="2"
            />
            <path
              d="M246 368V252h20v96h116"
              fill="none"
              stroke="#b8b8b1"
              strokeWidth="16"
            />
            <path
              d="M262 352h101"
              stroke="#ffffff"
              strokeWidth="5"
              opacity="0.8"
            />
          </g>
        </Frame>
      );

    case "rails-beams":
      return (
        <Frame>
          <g filter="url(#shadow)">
            {[0, 1, 2, 3].map((index) => {
              const x = 190 + index * 96;
              return (
                <g key={x}>
                  <rect x={x} y="175" width="62" height="245" rx="6" fill="url(#wood)" />
                  <path d={`M${x + 12} 185v225`} stroke="#efe2c9" strokeOpacity="0.7" strokeWidth="4" />
                  <path d={`M${x + 46} 185v225`} stroke="#79664d" strokeOpacity="0.28" strokeWidth="3" />
                </g>
              );
            })}
          </g>
        </Frame>
      );

    case "3d-panels":
      return (
        <Frame>
          <g filter="url(#shadow)">
            <rect x="215" y="150" width="370" height="300" rx="12" fill="url(#surface)" stroke="#c7c7c1" strokeWidth="2" />
            {[0, 1, 2, 3, 4].map((row) =>
              [0, 1, 2, 3, 4].map((col) => {
                const x = 235 + col * 68;
                const y = 170 + row * 54;
                const d = `M${x} ${y + 28}l34-22 34 22-34 22z`;
                return <path key={`${row}-${col}`} d={d} fill="#d3d3cd" stroke="#b9b9b2" strokeWidth="2" />;
              }),
            )}
          </g>
        </Frame>
      );

    case "wall-panels":
      return (
        <Frame>
          <g filter="url(#shadow)">
            <rect x="225" y="125" width="350" height="345" rx="10" fill="url(#surface)" stroke="#c5c5bf" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6].map((index) => {
              const x = 248 + index * 45;
              return (
                <g key={x}>
                  <rect x={x} y="150" width="18" height="295" rx="9" fill="#c7c7c0" />
                  <rect x={x + 7} y="155" width="4" height="285" rx="2" fill="#ffffff" opacity="0.75" />
                </g>
              );
            })}
          </g>
        </Frame>
      );

    case "stone-veneer":
      return (
        <Frame>
          <g filter="url(#shadow)">
            <path d="M205 430l42-252 300 26-36 245z" fill="url(#stone)" stroke="#9f9f9a" strokeWidth="2" />
            <path d="M240 393l60-178 220 34-65 181z" fill="#c9c8c2" opacity="0.7" />
            <path d="M252 250l55 15 34-19 66 18 38-15 54 12" fill="none" stroke="#888983" strokeWidth="6" opacity="0.45" />
            <path d="M254 320l46-11 42 20 65-22 53 17 52-15" fill="none" stroke="#8b8b86" strokeWidth="5" opacity="0.4" />
          </g>
        </Frame>
      );

    case "porcelain-stoneware":
      return (
        <Frame>
          <g filter="url(#shadow)">
            <rect x="180" y="120" width="420" height="360" rx="6" fill="url(#surface)" stroke="#c2c2bc" strokeWidth="2" />
            <path d="M230 210c70 18 95-25 156 4 52 25 89 12 129-22" fill="none" stroke="#b0b0aa" strokeWidth="7" opacity="0.45" />
            <path d="M206 316c62-32 113 8 173-16 68-27 119 6 197-36" fill="none" stroke="#9b9b94" strokeWidth="5" opacity="0.35" />
            <path d="M318 480c34-60 51-100 83-137 24-27 49-45 99-81" fill="none" stroke="#b7b7b0" strokeWidth="6" opacity="0.35" />
          </g>
        </Frame>
      );

    case "adhesives-accessories":
      return (
        <Frame>
          <g filter="url(#shadow)">
            <path d="M270 186h120l28 62-28 182H270l-24-182z" fill="#efefeb" stroke="#c2c2bc" strokeWidth="2" />
            <path d="M290 166h80v32h-80z" fill="#dadad4" stroke="#b7b7b0" strokeWidth="2" />
            <path d="M318 135h42v31h-42z" fill="#c4c4bd" />
            <circle cx="330" cy="282" r="28" fill="#d3d3cc" />
            <path d="M318 282h24" stroke="#9f9f98" strokeWidth="5" />
            <path d="M322 315h56" stroke="#b3b3ac" strokeWidth="6" />
            <path d="M456 210l76 54-20 26-76-54z" fill="#d0d0ca" stroke="#aeaea6" strokeWidth="2" />
            <path d="M478 280l43 28-36 55-40-24z" fill="#b9b9b1" opacity="0.8" />
          </g>
        </Frame>
      );

    default:
      return (
        <Frame>
          <g filter="url(#shadow)">
            <rect x="220" y="170" width="360" height="260" rx="12" fill="url(#surface)" stroke="#c7c7c1" strokeWidth="2" />
          </g>
        </Frame>
      );
  }
}

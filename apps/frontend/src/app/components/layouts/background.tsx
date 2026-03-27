const Background = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full bg-pink-50"
      style={{ zIndex: -1 }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1920 1080"
      >
        <defs>
          <pattern
            id="lightPinkZigzag"
            x="0"
            y="0"
            width="100"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 15 L25 0 L50 15 L75 0 L100 15"
              fill="none"
              stroke="rgba(251, 207, 232, 0.8)"
              strokeWidth="2"
            />
          </pattern>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.5" intercept="-0.2" />
              <feFuncG type="linear" slope="1.5" intercept="-0.2" />
              <feFuncB type="linear" slope="1.5" intercept="-0.2" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Background patterns */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#lightPinkZigzag)"
          opacity="0.7"
        />
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          filter="url(#noiseFilter)"
          opacity="0.25"
        />
      </svg>
    </div>
  );
};

export default Background;

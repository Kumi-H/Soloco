import React from "react";

const Background = () => {
    return (
        <div
            className="fixed inset-0 w-full h-full"
            style={{ zIndex: -1, backgroundColor: "#FFE5E3" }}
        >
            <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <defs>
                    <pattern
                        id="whiteZigzag"
                        x="0"
                        y="0"
                        width="120"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M0 20 L20 0 L40 20 L60 0 L80 20 L100 0 L120 20"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                        />
                    </pattern>
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.7"
                            numOctaves="8"
                            stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncR type="linear" slope="3" intercept="-0.5" />
                            <feFuncG type="linear" slope="3" intercept="-0.5" />
                            <feFuncB type="linear" slope="3" intercept="-0.5" />
                        </feComponentTransfer>
                    </filter>
                </defs>
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#whiteZigzag)"
                    opacity="0.3"
                />
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    filter="url(#noiseFilter)"
                    opacity="0.8"
                />
            </svg>
        </div>
    );
};

export default Background;

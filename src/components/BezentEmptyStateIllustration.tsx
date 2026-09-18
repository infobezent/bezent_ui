import React from "react";

export interface BezentEmptyStateIllustrationProps {
  size?: "small" | "medium" | "large" | "compact" | "default";
  className?: string;
  style?: React.CSSProperties;
  isDark?: boolean;
}

/**
 * Universal BEZENT SaaS Workspace Empty State Illustration
 *
 * Visual Components:
 * - Ambient soft purple aura & subtle background clouds
 * - Workspace application card with window dots, sidebar, and content rows
 * - Ceramic potted plant on the left with elegant sage-green foliage
 * - Stack of 3 books on the right ("Plan", "Organize", "Achieve")
 * - Elevated vibrant purple "+" button with breathing animation
 * - Origami paper plane traveling 10px diagonally up-right in a smooth 2.8s ease-in-out loop
 * - Dotted looped flight path with progressive stroke-dash reveal
 * - 2 subtle purple accent sparkle particles with gentle fade
 *
 * Full Accessibility:
 * - Respects @media (prefers-reduced-motion: reduce) by disabling all animations
 */
export function BezentEmptyStateIllustration({
  size = "large",
  className = "",
  style,
  isDark = false,
}: BezentEmptyStateIllustrationProps) {
  // Sizing: 175px in standard/large workspace, 130px in compact/drawer modes
  const isCompact = size === "small" || size === "compact";
  const displayWidth = isCompact ? 135 : 180;

  return (
    <div
      className={`bezent-empty-illustration-container ${className}`.trim()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: displayWidth,
        maxWidth: "100%",
        userSelect: "none",
        pointerEvents: "none",
        ...style,
      }}
    >
      <style>{`
        @keyframes bezent-plane-glide {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(11px, -11px);
          }
        }

        @keyframes bezent-path-reveal {
          0%, 100% {
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dashoffset: -14;
          }
        }

        @keyframes bezent-plus-breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        @keyframes bezent-card-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes bezent-particle-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.15);
          }
        }

        .bezent-empty-plane {
          animation: bezent-plane-glide 2.8s ease-in-out infinite;
          will-change: transform;
        }

        .bezent-empty-path {
          animation: bezent-path-reveal 2.8s ease-in-out infinite;
        }

        .bezent-empty-plus {
          animation: bezent-plus-breathe 2.2s ease-in-out infinite;
          transform-origin: 210px 108px;
          will-change: transform;
        }

        .bezent-empty-card {
          animation: bezent-card-float 3.6s ease-in-out infinite;
          will-change: transform;
        }

        .bezent-empty-p1 {
          animation: bezent-particle-pulse 2.8s ease-in-out infinite;
          transform-origin: 108px 38px;
        }

        .bezent-empty-p2 {
          animation: bezent-particle-pulse 3.2s ease-in-out infinite 0.6s;
          transform-origin: 280px 102px;
        }

        @media (prefers-reduced-motion: reduce) {
          .bezent-empty-plane,
          .bezent-empty-path,
          .bezent-empty-plus,
          .bezent-empty-card,
          .bezent-empty-p1,
          .bezent-empty-p2 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 340 215"
        width="100%"
        height="auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          {/* Ambient Background Aura Gradient */}
          <radialGradient
            id="bezentAura"
            cx="50%"
            cy="52%"
            r="50%"
            fx="50%"
            fy="52%"
          >
            <stop
              offset="0%"
              stopColor={isDark ? "#4C1D95" : "#F3E8FF"}
              stopOpacity={isDark ? "0.35" : "0.75"}
            />
            <stop
              offset="65%"
              stopColor={isDark ? "#3B0B62" : "#FAF5FF"}
              stopOpacity={isDark ? "0.15" : "0.35"}
            />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Plus Button Purple Gradient */}
          <linearGradient
            id="bezentPlusGrad"
            x1="190"
            y1="88"
            x2="230"
            y2="128"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#931CF5" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>

          {/* Card Surface Gradient */}
          <linearGradient
            id="bezentCardGrad"
            x1="165"
            y1="52"
            x2="165"
            y2="178"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={isDark ? "#1E0B36" : "#FFFFFF"} />
            <stop offset="100%" stopColor={isDark ? "#150626" : "#FBF7FE"} />
          </linearGradient>

          {/* Inner Card Background */}
          <linearGradient
            id="bezentInnerGrad"
            x1="185"
            y1="85"
            x2="185"
            y2="165"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={isDark ? "#281045" : "#FFFFFF"} />
            <stop offset="100%" stopColor={isDark ? "#200A38" : "#F7F0FD"} />
          </linearGradient>

          {/* Soft Drop Shadow for Window Card */}
          <filter id="bezentCardShadow" x="65" y="40" width="205" height="155" filterUnits="userSpaceOnUse">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="10"
              floodColor={isDark ? "#000000" : "#931CF5"}
              floodOpacity={isDark ? "0.45" : "0.08"}
            />
          </filter>

          {/* Plus Button Elevation Shadow */}
          <filter id="bezentPlusShadow" x="175" y="78" width="70" height="70" filterUnits="userSpaceOnUse">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="7"
              floodColor="#931CF5"
              floodOpacity={isDark ? "0.55" : "0.35"}
            />
          </filter>

          {/* Pot Shadow */}
          <filter id="bezentPotShadow" x="45" y="130" width="60" height="50" filterUnits="userSpaceOnUse">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="5"
              floodColor={isDark ? "#000000" : "#931CF5"}
              floodOpacity={isDark ? "0.3" : "0.07"}
            />
          </filter>
        </defs>

        {/* ── 1. AMBIENT BACKGROUND AURA & SOFT SUPPORTING CLOUDS ── */}
        <ellipse cx="170" cy="112" rx="145" ry="92" fill="url(#bezentAura)" />

        {/* Subtle decorative cloud shapes */}
        <path
          d="M 52 174 C 52 165 60 156 70 156 C 72 156 75 157 77 158 C 82 150 91 146 100 148 C 108 150 114 157 116 165 C 122 165 128 168 128 174 Z"
          fill={isDark ? "#2A0E47" : "#F4E8FF"}
          opacity={isDark ? "0.45" : "0.6"}
        />
        <path
          d="M 226 174 C 226 165 234 157 244 157 C 247 157 251 159 253 161 C 258 152 268 147 278 150 C 286 153 292 160 294 167 C 300 167 306 170 306 174 Z"
          fill={isDark ? "#2A0E47" : "#F4E8FF"}
          opacity={isDark ? "0.4" : "0.55"}
        />

        {/* ── 2. WORKSPACE WINDOW CARD (gentle 3.6s translateY float) ── */}
        <g className="bezent-empty-card">
          {/* Main Window Outer Card */}
          <rect
            x="85"
            y="52"
            width="165"
            height="126"
            rx="12"
            fill="url(#bezentCardGrad)"
            stroke={isDark ? "#3D1368" : "#E9D0FD"}
            strokeWidth="1.2"
            filter="url(#bezentCardShadow)"
          />

          {/* Window Header Dots */}
          <circle cx="98" cy="64" r="2.4" fill={isDark ? "#581093" : "#D8B4FE"} />
          <circle cx="105.5" cy="64" r="2.4" fill={isDark ? "#581093" : "#D8B4FE"} />
          <circle cx="113" cy="64" r="2.4" fill={isDark ? "#581093" : "#D8B4FE"} />
          <line
            x1="85"
            y1="73"
            x2="250"
            y2="73"
            stroke={isDark ? "#310D55" : "#F4E7FE"}
            strokeWidth="1"
          />

          {/* Window Left Sidebar Layout */}
          <rect x="94" y="83" width="22" height="4.5" rx="2" fill={isDark ? "#4C1D95" : "#E9D0FD"} opacity="0.85" />
          <rect x="94" y="93" width="18" height="4.5" rx="2" fill={isDark ? "#4C1D95" : "#E9D0FD"} opacity="0.6" />
          <rect x="94" y="103" width="20" height="4.5" rx="2" fill={isDark ? "#4C1D95" : "#E9D0FD"} opacity="0.6" />
          <rect x="94" y="113" width="16" height="4.5" rx="2" fill={isDark ? "#4C1D95" : "#E9D0FD"} opacity="0.45" />

          {/* Window Sidebar Divider */}
          <line
            x1="124"
            y1="73"
            x2="124"
            y2="178"
            stroke={isDark ? "#310D55" : "#F4E7FE"}
            strokeWidth="1"
          />

          {/* Window Right Main Workspace Content */}
          <rect
            x="132"
            y="81"
            width="110"
            height="88"
            rx="8"
            fill="url(#bezentInnerGrad)"
            stroke={isDark ? "#36105E" : "#F4E8FF"}
            strokeWidth="0.8"
          />

          {/* Workspace Row 1 */}
          <circle cx="144" cy="94" r="5" fill={isDark ? "#4C1D95" : "#E9D0FD"} />
          <rect x="154" y="92" width="34" height="4.5" rx="2" fill={isDark ? "#581093" : "#D8B4FE"} opacity="0.8" />
          <rect x="193" y="92" width="24" height="4.5" rx="2" fill={isDark ? "#4C1D95" : "#E9D0FD"} opacity="0.6" />

          {/* Workspace Row 2 */}
          <circle cx="144" cy="112" r="5" fill={isDark ? "#3B0B62" : "#F4E7FE"} />
          <rect x="154" y="110" width="40" height="4.5" rx="2" fill={isDark ? "#4C1D95" : "#E9D0FD"} opacity="0.75" />
          <rect x="199" y="110" width="16" height="4.5" rx="2" fill={isDark ? "#3B0B62" : "#F4E7FE"} opacity="0.6" />

          {/* Workspace Row 3 */}
          <circle cx="144" cy="130" r="5" fill={isDark ? "#4C1D95" : "#E9D0FD"} />
          <rect x="154" y="128" width="28" height="4.5" rx="2" fill={isDark ? "#4C1D95" : "#E9D0FD"} opacity="0.7" />
          <rect x="187" y="128" width="26" height="4.5" rx="2" fill={isDark ? "#3B0B62" : "#F4E7FE"} opacity="0.7" />

          {/* Workspace Row 4 / Bottom action line */}
          <rect x="154" y="146" width="36" height="4" rx="2" fill={isDark ? "#3B0B62" : "#F4E7FE"} opacity="0.8" />
        </g>

        {/* ── 3. POTTED PLANT ON THE LEFT ── */}
        <g filter="url(#bezentPotShadow)">
          {/* Ceramic Pot */}
          <path
            d="M 60 144 L 64 167 C 65 173, 83 173, 84 167 L 88 144 Z"
            fill={isDark ? "#281045" : "#FFFFFF"}
            stroke={isDark ? "#441470" : "#E9D0FD"}
            strokeWidth="1"
          />
          {/* Pot Rim / Soil */}
          <ellipse
            cx="74"
            cy="144"
            rx="14"
            ry="4"
            fill={isDark ? "#3D1368" : "#F4E7FE"}
          />

          {/* Stylized Sage/Green Leaves */}
          {/* Center upward leaf */}
          <path
            d="M 74 142 C 68 120, 72 104, 74 100 C 76 104, 80 120, 74 142 Z"
            fill="#10B981"
            opacity="0.9"
          />
          {/* Left leaf */}
          <path
            d="M 72 142 C 56 132, 45 120, 44 116 C 54 115, 67 124, 72 142 Z"
            fill="#059669"
            opacity="0.85"
          />
          {/* Right leaf */}
          <path
            d="M 76 142 C 92 130, 102 120, 104 116 C 96 114, 82 124, 76 142 Z"
            fill="#34D399"
            opacity="0.85"
          />
          {/* Small front leaf */}
          <path
            d="M 74 143 C 67 136, 67 129, 71 125 C 76 129, 77 136, 74 143 Z"
            fill="#6EE7B7"
          />
        </g>

        {/* ── 4. STACK OF 3 BOOKS ON THE RIGHT ("Plan", "Organize", "Achieve") ── */}
        <g>
          {/* Bottom Book: "Achieve" */}
          <rect
            x="220"
            y="156"
            width="62"
            height="14"
            rx="3"
            fill={isDark ? "#281045" : "#EDE9FE"}
            stroke={isDark ? "#4C1D95" : "#DDD6FE"}
            strokeWidth="0.8"
          />
          <text
            x="251"
            y="166.5"
            fontSize="7"
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
            fill={isDark ? "#BD74F9" : "#7C3AED"}
            textAnchor="middle"
            letterSpacing="0.04em"
          >
            Achieve
          </text>

          {/* Middle Book: "Organize" */}
          <rect
            x="223"
            y="142"
            width="56"
            height="14"
            rx="3"
            fill={isDark ? "#1E0B36" : "#F5F3FF"}
            stroke={isDark ? "#3D1368" : "#E9D0FD"}
            strokeWidth="0.8"
          />
          <text
            x="251"
            y="152.5"
            fontSize="7"
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
            fill={isDark ? "#DEB9FC" : "#8B5CF6"}
            textAnchor="middle"
            letterSpacing="0.04em"
          >
            Organize
          </text>

          {/* Top Book: "Plan" */}
          <rect
            x="226"
            y="128"
            width="50"
            height="14"
            rx="3"
            fill={isDark ? "#2E0E54" : "#FFFFFF"}
            stroke={isDark ? "#441470" : "#E9D0FD"}
            strokeWidth="0.8"
          />
          <text
            x="251"
            y="138.5"
            fontSize="7"
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
            fill={isDark ? "#E9D0FD" : "#931CF5"}
            textAnchor="middle"
            letterSpacing="0.04em"
          >
            Plan
          </text>
        </g>

        {/* ── 5. DOTTED FLIGHT TRAIL (looping bezier curve with stroke-dash reveal) ── */}
        <g className="bezent-empty-path">
          <path
            d="M 198 86 C 214 62, 236 48, 252 60 C 263 69, 262 82, 250 82 C 238 82, 238 65, 256 52 C 270 42, 282 40, 290 42"
            fill="none"
            stroke={isDark ? "#A855F7" : "#C084FC"}
            strokeWidth="1.6"
            strokeDasharray="3.5 4"
            strokeLinecap="round"
          />
        </g>

        {/* ── 6. PAPER AIRPLANE (gentle 11px diagonal glide & return loop) ── */}
        <g className="bezent-empty-plane">
          {/* Origami Paper Plane angled up-right */}
          <g transform="translate(288, 38) rotate(6)">
            {/* Top Wing Facet */}
            <polygon points="0,12 24,0 10,18" fill="#C084FC" />
            {/* Center Fold / Main Body */}
            <polygon points="0,12 24,0 6,10" fill="#E9D0FD" opacity="0.95" />
            {/* Bottom Wing */}
            <polygon points="10,18 24,0 14,21" fill="#931CF5" />
            {/* Shadow Underwing */}
            <polygon points="6,14 10,18 14,21" fill="#6B21A8" />
            {/* Crisp center crease fold line */}
            <line x1="0" y1="12" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.9" />
          </g>
        </g>

        {/* ── 7. PURPLE "+" FLOATING BUTTON (gentle breathing scale 1 -> 1.04 -> 1) ── */}
        <g className="bezent-empty-plus">
          {/* Energy Rays / Accent Ticks */}
          <line
            x1="230"
            y1="93"
            x2="238"
            y2="85"
            stroke={isDark ? "#C084FC" : "#A855F7"}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />
          <line
            x1="237"
            y1="103"
            x2="246"
            y2="100"
            stroke={isDark ? "#C084FC" : "#A855F7"}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.75"
          />
          <line
            x1="221"
            y1="85"
            x2="224"
            y2="77"
            stroke={isDark ? "#C084FC" : "#A855F7"}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Elevated Circular Purple Disk with Drop Shadow */}
          <circle
            cx="210"
            cy="108"
            r="23"
            fill="url(#bezentPlusGrad)"
            filter="url(#bezentPlusShadow)"
          />

          {/* Clean White "+" in Center */}
          <path
            d="M 210 97 L 210 119 M 199 108 L 221 108"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>

        {/* ── 8. SUBTLE PURPLE ACCENT SPARKLES (opacity 0.3 -> 0.85 -> 0.3) ── */}
        {/* Particle 1 at top-left */}
        <path
          className="bezent-empty-p1"
          d="M 108 34 Q 108 38 104 38 Q 108 38 108 42 Q 108 38 112 38 Q 108 38 108 34 Z"
          fill="#A855F7"
        />

        {/* Particle 2 at bottom-right */}
        <path
          className="bezent-empty-p2"
          d="M 280 99 Q 280 102 277 102 Q 280 102 280 105 Q 280 102 283 102 Q 280 102 280 99 Z"
          fill="#C084FC"
        />
      </svg>
    </div>
  );
}

export default BezentEmptyStateIllustration;

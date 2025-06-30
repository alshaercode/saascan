import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Logo() {
  const location = useLocation();
  const circleRef = useRef<SVGCircleElement>(null);
  const barsRef = useRef<SVGRectElement[]>([]);

  useEffect(() => {
    if (location.pathname !== "/") return; // Animate only on home page

    const circle = circleRef.current;
    if (circle) {
      const length = circle.getTotalLength();
      circle.style.strokeDasharray = `${length}`;
      circle.style.strokeDashoffset = `${length}`;
      setTimeout(() => {
        circle.style.transition = "stroke-dashoffset 1.5s ease-out";
        circle.style.strokeDashoffset = "0";
      }, 100);
    }

    barsRef.current.forEach((bar, i) => {
      if (bar) {
        // Use getTotalLength if available; rects may not support it, so fallback:
        const length = bar.getTotalLength
          ? bar.getTotalLength()
          : bar.getBBox().width;
        bar.style.strokeDasharray = `${length}`;
        bar.style.strokeDashoffset = `${length}`;
        setTimeout(() => {
          bar.style.transition = `stroke-dashoffset 1s ease-out ${
            (i + 1) * 300
          }ms`;
          bar.style.strokeDashoffset = "0";
        }, 100);
      }
    });
  }, [location.pathname]);

  const setBarRef = (el: SVGRectElement, idx: number) => {
    barsRef.current[idx] = el;
  };

  return (
    <Link
      to="/"
      aria-label="Go to home - SaaS Idea Analyzer"
      className="inline-block cursor-pointer select-none group"
      tabIndex={0}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 ease-in-out group-hover:scale-110 group-focus:scale-110"
        aria-hidden="true"
      >
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r="35"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
          style={{ strokeDasharray: 0, strokeDashoffset: 0 }}
        />
        <rect
          ref={(el) => el && setBarRef(el, 0)}
          x="38"
          y="65"
          width="6"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          rx={1}
          ry={1}
          className="group-hover:stroke-blue-600 transition-colors duration-300"
          style={{ strokeDasharray: 0, strokeDashoffset: 0 }}
        />
        <rect
          ref={(el) => el && setBarRef(el, 1)}
          x="50"
          y="55"
          width="6"
          height="25"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          rx={1}
          ry={1}
          className="group-hover:stroke-blue-600 transition-colors duration-300"
          style={{ strokeDasharray: 0, strokeDashoffset: 0 }}
        />
        <rect
          ref={(el) => el && setBarRef(el, 2)}
          x="62"
          y="45"
          width="6"
          height="35"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          rx={1}
          ry={1}
          className="group-hover:stroke-blue-600 transition-colors duration-300"
          style={{ strokeDasharray: 0, strokeDashoffset: 0 }}
        />
        <rect
          x="75"
          y="75"
          width="12"
          height="30"
          rx={6}
          ry={6}
          fill="currentColor"
          transform="rotate(-45 75 75)"
          className="group-hover:fill-blue-600 transition-colors duration-300"
        />
        <text
          x="60"
          y="110"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill="currentColor"
          textAnchor="middle"
          className="group-hover:fill-blue-600 transition-colors duration-300"
        >
          SaaS Analyzer
        </text>
      </svg>
    </Link>
  );
}

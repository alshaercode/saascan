
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Logo() {
  const location = useLocation();
  const circleRef = useRef<SVGCircleElement>(null);
  const scanLineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (location.pathname !== "/") return; // Animate only on home page

    const circle = circleRef.current;
    const scanLine = scanLineRef.current;
    
    if (circle) {
      const length = circle.getTotalLength();
      circle.style.strokeDasharray = `${length}`;
      circle.style.strokeDashoffset = `${length}`;
      setTimeout(() => {
        circle.style.transition = "stroke-dashoffset 1.5s ease-out";
        circle.style.strokeDashoffset = "0";
      }, 100);
    }

    if (scanLine) {
      const length = scanLine.getTotalLength();
      scanLine.style.strokeDasharray = `${length}`;
      scanLine.style.strokeDashoffset = `${length}`;
      setTimeout(() => {
        scanLine.style.transition = "stroke-dashoffset 1s ease-out 800ms";
        scanLine.style.strokeDashoffset = "0";
      }, 100);
    }
  }, [location.pathname]);

  return (
    <Link
      to="/"
      aria-label="Go to home - SaasCan"
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
        {/* Radar/Scanner Circle */}
        <circle
          ref={circleRef}
          cx="60"
          cy="60"
          r="35"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
          style={{ strokeDasharray: 0, strokeDashoffset: 0 }}
        />
        
        {/* Inner scanning circle */}
        <circle
          cx="60"
          cy="60"
          r="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
        />
        
        {/* Scanning line */}
        <line
          ref={scanLineRef}
          x1="60"
          y1="25"
          x2="60"
          y2="95"
          stroke="currentColor"
          strokeWidth="2"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
          style={{ strokeDasharray: 0, strokeDashoffset: 0 }}
        />
        
        {/* Scanner dot in center */}
        <circle
          cx="60"
          cy="60"
          r="3"
          fill="currentColor"
          className="group-hover:fill-blue-600 transition-colors duration-300"
        />
        
        {/* Corner brackets for scanner effect */}
        <path
          d="M 35 35 L 25 35 L 25 25 L 35 25"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
        />
        <path
          d="M 85 35 L 95 35 L 95 25 L 85 25"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
        />
        <path
          d="M 35 85 L 25 85 L 25 95 L 35 95"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
        />
        <path
          d="M 85 85 L 95 85 L 95 95 L 85 95"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
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
          SaasCan
        </text>
      </svg>
    </Link>
  );
}

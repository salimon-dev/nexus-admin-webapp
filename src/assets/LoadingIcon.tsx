export default function LoadingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      //   style="shape-rendering: auto; display: block; background: transparent;"
    >
      <g>
        <path
          //   style="transform:scale(1);transform-origin:50px 50px"
          strokeLinecap="round"
          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
          strokeDasharray="192.4416961669922 64.14723205566406"
          strokeWidth="8"
          style={{ stroke: "#444" }}
          fill="none"
        >
          <animate
            values="0;256.58892822265625"
            keyTimes="0;1"
            dur="1.4285714285714284s"
            repeatCount="indefinite"
            attributeName="stroke-dashoffset"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

import { CSSProperties } from "react";

interface IProps {
  style?: CSSProperties;
}
export default function Icon({ style }: IProps) {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0,0,600,600"
      xmlns="http://www.w3.org/2000/svg"
      stroke="black"
      style={style}
    >
      <g>
        <line y2="500" x2="300" y1="100" x1="300" strokeWidth="30" fill="none" />
        <line y2="100" x2="500" y1="100" x1="285" strokeWidth="30" fill="none" />
        <line y2="500" x2="315" y1="500" x1="100" strokeWidth="30" fill="none" />
        <ellipse ry="64" rx="64" cy="300" cx="175" strokeWidth="30" fill="none" />
        <ellipse ry="64" rx="64" cy="300" cx="425" strokeWidth="30" fill="none" />
      </g>
    </svg>
  );
}

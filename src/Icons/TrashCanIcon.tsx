import { IconProps } from "./types";

export default function TrashCanIcon(props: IconProps) {
  const { width = 24, height = 24, color = "currentColor" } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6h18M9 6V4h6v2M5 6v16a2 2 0 002 2h10a2 2 0 002-2V6H5zm3 4h2v10H8V10zm6 0h2v10h-2V10z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

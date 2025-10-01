export const PlusButton = ({ isActive, color }) => {

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="plus-button"
    >
      <path
        d="M11.27 7.06398H6.064H5H0V5.99998H5H6.064H11.27V7.06398Z"
        fill={color || "#1b1917"}
      />
      <path d="M6.064 7.06398H5V12H6.064V7.06398Z" fill={isActive ? "transparent" : color || "#1b1917"} />
      <path
        d="M5 5.99998H6.064L6.064 0.72998L5 0.729981L5 3.36498V5.99998Z"
        fill={isActive ? "transparent" : color || "#1b1917"}
      />
    </svg>
  );
}
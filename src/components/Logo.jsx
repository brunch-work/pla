export const Logo = ({ fill = "#1b1917" }) => (
  <div className="logo">
    <span className="P">P</span>
    <span>
      <span className="letters">oetry</span>
    </span>
    <svg
      width="10"
      height="16.25"
      viewBox="0 0 32 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Keep the circle visually the same size: original radius 4.94322 in a 32-wide viewBox.
          To keep the same visual pixel size when reducing rendered width from 32 -> 10,
          we keep the viewBox unchanged so the circle's r can stay the same. Center the circle
          horizontally by using cx = 16 (center of 32). */}
      <circle cx="16" cy="30" r="4.94322" fill="black" />
    </svg>

    <span>LA</span>
  </div>
);

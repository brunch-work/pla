import { useLogo } from "@/utils/logoState";
import { useEffect } from "react";
import { useAnimate } from "motion/react";

export const Logo = ({ fill = "#1b1917" }) => {
  const { isAnimating, isDone } = useLogo();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (animate && isAnimating) {
      animate(
        scope.current,
        { opacity: 0, marginLeft: "-3.72ch" },
        { duration: 1.4, delay: 3 },
      );
      setTimeout(() => {
        useLogo.setState({ isDone: true, isAnimating: false });
      }, 5000);
    }
  }, [animate]);

  return (
    <div className={`logo ${isDone ? "done" : ""}`}>
      <span className="P">P</span>
      <span>
        <span className="letters" ref={scope}>
          oetry
        </span>
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
        <circle cx="16" cy="30" r="4.94322" fill={fill} />
      </svg>

      <span>LA</span>
    </div>
  );
};

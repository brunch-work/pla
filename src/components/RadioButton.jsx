import { Link } from "next-view-transitions";

export const RadioButton = ({
  label,
  url,
  ariaCurrent,
}) => {
  return (
    <Link className="radio-button" href={url} aria-current={ariaCurrent}>
      {label}
    </Link>
  );
};

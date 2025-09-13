import Link from "next/link";

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

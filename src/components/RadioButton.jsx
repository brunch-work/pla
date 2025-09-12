import Link from "next/link";

export const RadioButton = ({
  active,
  label,
  name,
  value,
  url,
  ariaCurrent,
}) => {
  return (
    <Link className="radio-button" href={url} aria-current={ariaCurrent}>
      <label htmlFor={label} tabIndex={0}>
        <input
          type="radio"
          id={label}
          name={name}
          checked={active}
          value={value}
          readOnly
        />
        {label}
      </label>
    </Link>
  );
};

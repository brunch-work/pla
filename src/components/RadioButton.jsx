import { Link } from "next-view-transitions";

export const RadioButton = ({active, label, name, value, href}) => {
  return (
    <Link href={href}>
      <div className="radio-button">
        <input type="radio" id={label} name={name} checked={active} value={value} readOnly/>
        <label htmlFor={label}>{label}</label>
      </div>
    </Link>
  );
};
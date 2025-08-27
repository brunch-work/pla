export const RadioButton = ({active, label, name, value}) => {
  return (
    <div className="radio-button">
      <input type="radio" id={label} name={name} checked={active} value={value} readOnly/>
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
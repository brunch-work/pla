export const RadioButton = ({active, label, name}) => {
  return (
    <div className="radio-button">
      <input type="radio" id={label} name={name} checked={active} value={label} readOnly/>
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
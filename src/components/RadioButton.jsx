export const RadioButton = ({active, label}) => {
  return (
    <div className="radio-button">
      <input type="radio" id={label} name="radio-button" checked={active} value={label} readOnly/>
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
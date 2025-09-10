export const RadioButton = ({ active, label, name, value }) => {
  return (
    <div className="radio-button">
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
    </div>
  );
};

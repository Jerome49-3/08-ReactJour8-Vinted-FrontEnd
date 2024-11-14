const Input = ({ value, id, type, placeholder, setState, label, min, max, classInput, classLabel, isRequired }) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };
  return (
    <>
      {label !== undefined ? (
        <label htmlFor={id} className={classLabel}>{label}</label>
      ) : null}
      <input
        id={id}
        type={type}
        name={id}
        min={min}
        max={max}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className={classInput}
        required={isRequired || false}
      />
    </>
  );
};

export default Input;

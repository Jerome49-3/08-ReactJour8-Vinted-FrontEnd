const Input = ({ value, id, type, placeholder, setState, label, min, max, classInput }) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };
  return (
    <>
      {label !== undefined ? (
        <div>
          <label htmlFor={id}>{label}</label>
        </div>
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
      />
    </>
  );
};

export default Input;

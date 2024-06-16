const Input = ({ value, id, type, placeholder, setState, label }) => {
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
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </>
  );
};

export default Input;

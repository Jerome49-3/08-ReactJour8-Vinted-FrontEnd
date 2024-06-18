const Input = ({ value, id, type, placeholder, setState, label }) => {
  const handleChange = (e) => {
    if (type === 'text' || type === 'files' || type === "number" || type === "email" || type === "password") {
      setState(e.target.value);
    } else if (type === 'file') {
      setState(e.target.files);
    }
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

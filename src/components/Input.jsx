import { useState, useEffect } from "react";

const Input = ({
  value,
  id,
  type,
  placeholder,
  setState,
  label,
  min,
  max,
  classInput,
  classLabel,
  isRequired,
}) => {
  const [errorValidInput, setErrorValidInput] = useState("");
  const handleChange = (e) => {
    console.log("e.target.value:", e.target.value);
    console.log("e on input:", e);
    setState(e.target.value);
    if (e.target.value < e.target.min || e.target.value > e.target.min) {
      setErrorValidInput(e.target.validationMessage);
    }
  };
  useEffect(() => {
    if (!value) {
      setErrorValidInput("");
    }
  }, [value]);

  return (
    <>
      {label !== undefined ? (
        <label htmlFor={id} className={classLabel}>
          {label}
        </label>
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
      <small className="redInput">{errorValidInput}</small>
    </>
  );
};

export default Input;

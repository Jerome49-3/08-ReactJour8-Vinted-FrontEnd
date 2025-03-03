import { useState, useEffect } from "react";
import transformStr from "../assets/lib/transformStr";
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
  // console.log("value on input:", value);
  const [errorValidInput, setErrorValidInput] = useState("");
  const handleChange = (e) => {
    // console.log("e.target.value:", e.target.value);
    // console.log("e on input:", e);
    const finalTarget = transformStr(e);
    setState(finalTarget);
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
      <label htmlFor={id} className="classLabelInput">
        {label}
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
      </label>
      {errorValidInput && <small className="redInput">{errorValidInput}</small>}
    </>
  );
};

export default Input;

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
  isRequired,
}) => {
  // console.log("value on input:", value);
  // console.log("type on input:", type);
  const [errorValidInput, setErrorValidInput] = useState("");
  useEffect(() => {
    if (!value) {
      setErrorValidInput("");
    }
  }, [value]);
  const handleChange = (e) => {
    // console.log("e.target.value in handleChange:", e.target.value);
    // console.log("e.target.type in handleChange:", e.target.type);
    // console.log("typeofe.target.type in handleChange:", typeof e.target.type);
    if (
      e.target.type === "email" ||
      e.target.type === "password" ||
      e.target.type === "number" ||
      e.target.type === "checkbox" ||
      e.target.type === "radio"
    ) {
      setState(e.target.value);
    } else {
      const finalTarget = transformStr(e);
      setState(finalTarget);
    }
    if (e.target.type === "number") {
      if (e.target.value < e.target.min || e.target.value > e.target.min) {
        setErrorValidInput(e.target.validationMessage);
      }
    }
  };

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

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import transformStr from "../assets/lib/transformStr";
import { useUser } from "../assets/lib/userFunc";
const Input = ({
  value,
  id,
  type,
  placeholder,
  setState,
  labelTxt,
  min,
  max,
  classInput,
  required,
}) => {
  // console.log("value on input:", value);
  // console.log("type on input:", type);
  const { setErrorMessage } = useUser();
  useEffect(() => {
    if (!value) {
      setErrorMessage("");
    }
  }, [value]);
  const handleChange = (e) => {
    // console.log("e.target.value in handleChange:", e.target.value);
    // console.log(
    //   "typeofe.target.type in handleChange:",
    //   typeof e.target.type,
    //   "\n",
    //   "e.target.type in handleChange:",
    //   e.target.type
    // );
    if (
      e.target.type === "email" ||
      e.target.type === "password" ||
      e.target.type === "checkbox" ||
      e.target.type === "radio"
    ) {
      setState(e.target.value);
    } else {
      const finalTarget = transformStr(e);
      setState(finalTarget);
    }
    if (e.target.type === "number") {
      if (e.target.value < e.target.min || e.target.value > e.target.max) {
        setErrorMessage(e.target.validationMessage);
      } else {
        setState(e.target.value);
      }
    }
  };

  return (
    <>
      <label htmlFor={id} className="classLabelInput">
        {labelTxt}
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
          required={required || false}
        />
      </label>
    </>
  );
};

export default Input;

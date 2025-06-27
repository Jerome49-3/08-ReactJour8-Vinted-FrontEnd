/* eslint-disable react-hooks/exhaustive-deps */
import transformStr from "../assets/lib/transformStr";
import { useUser } from "../assets/lib/userFunc";
import { validatePassword } from "../assets/lib/passwordValidator";
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
  //classLabel by default =
  // console.log("value on input:", value);
  // console.log("type on input:", type);
  const { setErrorMessage, setInfoUser } = useUser();
  const handleChange = (e) => {
    // console.log("e.target.value in handleChange:", e.target.value);
    // console.log(
    //   "typeofe.target.type in handleChange:",
    //   typeof e.target.type,
    //   "\n",
    //   "e.target.type in handleChange:",
    //   e.target.type
    // );
    if (e.target.type === "text" || e.target.type === "search") {
      const finalTarget = transformStr(e);
      setState(finalTarget);
    } else if (e.target.type === "password") {
      const pwd = validatePassword(e.target.value);
      // console.log("pwd on input:", pwd);
      if (pwd.errors && pwd.isValid === true) {
        const pwdNotValid = pwd.errors.join(" - ");
        // console.log("pwdNotValid:", pwdNotValid);
        setInfoUser(pwdNotValid);
      } else {
        setInfoUser("");
      }

      setState(e.target.value);
    } else if (e.target.type === "email") {
      setState(e.target.value.toLowerCase());
    }
    if (e.target.type === "number") {
      // console.log(
      //   "e.target.value in if e.target.type === number handleChange:",
      //   e.target.value
      // );
      if (
        Number(e.target.value) < Number(e.target.min) ||
        Number(e.target.value) > Number(e.target.max)
      ) {
        setErrorMessage(e.target.validationMessage);
      } else {
        setState(e.target.value);
      }
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className={
          type === "hidden" ? "classLabelInputHidden" : "classLabelInput"
        }
      >
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

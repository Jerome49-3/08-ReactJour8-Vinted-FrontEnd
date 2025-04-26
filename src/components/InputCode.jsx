/* eslint-disable no-unused-vars */
import { useRef } from "react";

const InputCode = ({ code, setCode }) => {
  // const [code, setCode] = useState([null, null, null, null, null, null]);
  //OnChange Input Code
  const inputRefs = useRef([]);
  const handleChangeInputCode = (e, index) => {
    // console.log("e:", e);
    // console.log("e.target.value on handleChangeInputCode:", e.target.value);
    // console.log("index on handleChangeInputCode:", index);
    //i assigne e.target.value on a constant
    const nbrInput = e.target.value;
    // i make a spread operator at code
    const newArrayInputCode = [...code];
    // i assigne on each index of array newArrayInputCode: e.target.value
    newArrayInputCode[index] = nbrInput;
    // i update the state with the array newArrayInputCode
    // console.log(
    //   "newArrayInputCode on handleChangeInputCode:",
    //   newArrayInputCode
    // );
    // if nbrInput and index is down of newArrayInputCode.length -1
    if (nbrInput && index < newArrayInputCode.length - 1) {
      //i move
      inputRefs.current[index + 1].focus();
    }
    setCode(newArrayInputCode);
  };
  const handleSuppNbr = (e, index) => {
    // console.log("e dans onKeyDown:", e);
    // console.log("index in onKeyDown:", index);
    const newArrayInputCode = [...code];
    const codeLength = newArrayInputCode.length;
    // console.log("codeLength in onKeyDown:", codeLength);
    if (e.key === "Backspace") {
      if (index < codeLength)
        do {
          newArrayInputCode[index] = "";
        } while (index === 0);
      inputRefs.current[index - 1].focus();
    }
    // console.log(
    //   "newArrayInputCode.length in onKeyDown:",
    //   newArrayInputCode.length
    // );
    setCode(newArrayInputCode);
  };
  return (
    <div className="boxContainerInputCode">
      {code.map((inputCode, index) => {
        // console.log("inputCode in ConfirmEmail:", inputCode);
        return (
          <label htmlFor="code" className="boxInputCode" key={index}>
            <input
              id={`code-${index}`}
              type="text"
              value={code[index] || ""}
              onChange={(e) => handleChangeInputCode(e, index)}
              className="classInputCode"
              placeholder="0"
              required
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              onKeyDown={(e) => handleSuppNbr(e, index)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default InputCode;

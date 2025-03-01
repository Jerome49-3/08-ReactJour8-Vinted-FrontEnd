import { useRef } from "react";

const InputCode = ({ code, setCode }) => {
  // const [code, setCode] = useState([null, null, null, null, null, null]);
  //OnChange Input Code
  const inputRefs = useRef([]);
  const handleChangeInputCode = (e, index) => {
    console.log("e.target.value on handleChangeInputCode:", e.target.value);
    console.log("index on handleChangeInputCode:", index);
    const nbrInput = e.target.value;
    const newArrayInputCode = [...code];
    newArrayInputCode[index] = nbrInput;
    setCode(newArrayInputCode);
    console.log(
      "newArrayInputCode on handleChangeInputCode:",
      newArrayInputCode
    );
    if (nbrInput && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="boxContainerInputCode">
      {code.map((inputCode, index) => {
        console.log("inputCode in ConfirmEmail:", inputCode);
        return (
          <label htmlFor="code" className="boxInputCode" key={index}>
            <input
              id={`code-${index}`}
              type="text"
              value={code[index]}
              onChange={(e) => handleChangeInputCode(e, index)}
              className="classInputCode"
              placeholder="0"
              required
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default InputCode;

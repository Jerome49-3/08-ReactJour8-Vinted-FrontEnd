import transformStr from "../assets/lib/transformStr";

const TextArea = ({
  setState,
  value,
  id,
  placeholder,
  onKeyPress,
  onKeyDown,
  classTextArea,
  wrap,
  rows,
  cols,
  required,
  minLength,
  maxLength,
  labelTxt,
}) => {
  return (
    <label htmlFor={id} className="labelTxtContact">
      {labelTxt}
      <textarea
        value={value}
        name={id}
        id={id}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        className={classTextArea}
        onChange={(e) => {
          const finalTarget = transformStr(e);
          console.log("finalTarget on textArea component:", finalTarget);
          setState(finalTarget);
        }}
        wrap={wrap}
        rows={rows}
        cols={cols}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      ></textarea>
    </label>
  );
};

export default TextArea;

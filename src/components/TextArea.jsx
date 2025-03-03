import transformStr from "../assets/lib/transformStr";

const TextArea = ({
  setState,
  value,
  name,
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
  labelTitle,
}) => {
  return (
    <label htmlFor={name} className="labelTxtContact">
      {labelTitle}
      <textarea
        value={value}
        name={name}
        id={name}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        className={classTextArea}
        onChange={(e) => {
          const finalTarget = transformStr(e);
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

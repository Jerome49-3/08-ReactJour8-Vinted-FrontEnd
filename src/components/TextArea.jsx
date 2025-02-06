const TextArea = ({
  setState,
  value,
  name,
  placeholder,
  onKeyPress,
  onKeyDown,
}) => {
  return (
    <textarea
      value={value}
      name={name}
      id={name}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onChange={(e) => {
        setState(e.target.value);
      }}
    ></textarea>
  );
};

export default TextArea;

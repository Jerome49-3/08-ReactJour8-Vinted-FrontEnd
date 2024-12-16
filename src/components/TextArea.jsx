import React from "react";

const TextArea = ({ setState, value, name, placeholder, onKeyPress }) => {
  return (
    <textarea
      value={value}
      name={name}
      id={name}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      onChange={(e) => {
        setState(e.target.value);
      }}
    ></textarea>
  );
};

export default TextArea;

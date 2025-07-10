const InputCheckBox = ({
  legendTxt,
  nameCheckbox,
  idCheckbox,
  state,
  setState,
}) => {
  console.log("state on InputCheckBox:", state);

  const handleChange = () => {
    setState(!state);
  };

  return (
    <fieldset className="boxCheckbox">
      {legendTxt && <legend>{legendTxt}</legend>}
      <label htmlFor={idCheckbox} className="labelCheckbox">
        <p>{idCheckbox}</p>
        <input
          type="checkbox"
          id={idCheckbox}
          name={nameCheckbox}
          value={state}
          className="checkbox"
          onChange={handleChange}
        />
      </label>
    </fieldset>
  );
};

export default InputCheckBox;

const SelectOptions = (props) => {
  const { selectName, values, selected, setOptionValue } = props;

  // console.log(
  //   "selectName in SelectOptions:",
  //   selectName,
  //   "\n",
  //   "values in SelectOptions:",
  //   values,
  //   "\n",
  //   "selected in SelectOptions:",
  //   selected
  // );

  const handleChange = (e) => {
    console.log("e.target.value:", e.target.value);
    // console.log("e.target on input:", e.target);
    setOptionValue(e.target.value);
  };

  return (
    <section className="wrapperSelect">
      <select
        name={selectName}
        id={selectName}
        onChange={handleChange}
        defaultValue={selected}
      >
        {values.map((value, index) => {
          // console.log("value in select:", value);
          return (
            <option value={value} key={index}>
              {value}
            </option>
          );
        })}
      </select>
    </section>
  );
};

export default SelectOptions;

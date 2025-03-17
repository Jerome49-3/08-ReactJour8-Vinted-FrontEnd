const InputArrayObject = ({ id, arrayObject, setArrayObject }) => {
  const handleChangeArrObject = (e, index, detail) => {
    console.log(
      "index in handleChangeArrObject:",
      index,
      "\n",
      "detail in handleChangeArrObject:",
      detail
    );
    const key = Object.keys(detail)[0];
    const newArrayObject = [...arrayObject];
    newArrayObject.splice(index, 1, {
      [key]: e.target.value,
    });
    setArrayObject(newArrayObject);
  };

  return (
    <>
      {arrayObject.map((detail, index) => {
        // console.log("detail", detail);
        // console.log(
        //   "Object.keys(detail)[0] in onChange:",
        //   Object.keys(detail)[0]
        // );
        return (
          <label
            htmlFor={`labelObject_${index}`}
            className="classLabelInput"
            key={index}
          >
            {Object.keys(detail) + ":"}
            <input
              type="text"
              id={`inputObject_${index}`}
              name={`inputObject_${index}`}
              placeholder={Object.values(detail)}
              value={Object.values(detail) || ""}
              onChange={(e) => handleChangeArrObject(e, index, detail)}
              autoComplete="on"
            />
          </label>
        );
      })}
    </>
  );
};

export default InputArrayObject;

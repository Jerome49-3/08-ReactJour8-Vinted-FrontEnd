import { Fragment } from "react";

const InputArrayObject = ({ id, arrayObject, setArrayObject }) => {
  const handleChangeArrObject = (e, index, detail) => {
    // console.log(
    //   "index in handleChangeArrObject:",
    //   index,
    //   "\n:",
    //   "detail in handleChangeArrObject:",
    //   detail
    // );
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
          <Fragment key={index}>
            <label htmlFor={id} className="classLabelInput">
              {Object.keys(detail) + ":"}
              <input
                type="text"
                id={id}
                name={id}
                placeholder={Object.values(detail)}
                value={Object.values(arrayObject[index]) || ""}
                onChange={(e) => handleChangeArrObject(e, index, detail)}
              />
            </label>
            <input
              id={`arrayObject_${index}`}
              type="hidden"
              name={`arrayObject_${index}`}
              value={index}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default InputArrayObject;

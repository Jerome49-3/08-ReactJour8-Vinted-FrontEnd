

const Input = ({ value, id, type, placeholder, setState, label }) => {
  return (
    <>
      {label !== undefined ? (
        <div>
          <label htmlFor={id}>{label}</label>
        </div>
      ) : (null)}
      <input id={id} type={type} name={id} placeholder={placeholder} onChange={(e) => {
        setState(e.target.value)
      }} value={value} />
    </>
  )
}

export default Input

const InputFile = ({ labelTxt, pictures, setPictures, setAvatar }) => {

  return (
    <div className="boxPictures">
      <label htmlFor="pictures">{labelTxt}</label>
      <input
        type="file"
        id='pictures'
        name='pictures'
        onChange={(e) => {
          console.log('e.target.files:', e.target.files[0]);
          setPictures(e.target.files[0]);
          setAvatar(URL.createObjectURL(e.target.files[0]))
        }}
      />
      {pictures ? (<div>{pictures.name}</div>) : (null)}
    </div>
  )
}

export default InputFile
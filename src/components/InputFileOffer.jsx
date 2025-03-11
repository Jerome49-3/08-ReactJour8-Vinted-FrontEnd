const InputFileOffer = ({
  labelTxt,
  pictures,
  setPictures,
  setAvatarOffer,
}) => {
  return (
    <div className="boxPictures">
      <label htmlFor="pictures">
        {labelTxt}
        <input
          type="file"
          id="pictures"
          name="pictures"
          multiple={true}
          onChange={(e) => {
            console.log("e.target on inputFile:", e.target);
            console.log("e.target.files[0] on inputFile:", e.target.files[0]);
            // setPictures(e.target.files[0]);
            // setAvatarOffer(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </label>
      {pictures ? <div>{pictures.name}</div> : null}
    </div>
  );
};

export default InputFileOffer;

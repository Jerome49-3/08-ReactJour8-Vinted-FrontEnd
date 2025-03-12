const InputFileOffer = ({
  labelTxt,
  pictures,
  setPictures,
  setAvatarOffer,
  index,
}) => {
  console.log("index:", index);

  return (
    <div className="boxInputPictures">
      <label htmlFor="pictures">
        {labelTxt}
        <input
          type="file"
          id="pictures"
          name="pictures"
          multiple={true}
          onChange={(e, index) => {
            console.log("e.target.files:", e.target.files);
            console.log("e.target.files[0] on inputFile:", e.target.files[0]);
            console.log("index:", index);
            let newPic = [...pictures];
            const files = e.target.files[0];
            if (files) {
              for (let i = 0; i < newPic.length; i++) {
                console.log("i:", i);
                const el = newPic[i];
                console.log("el:", el);
                if (i === index) {
                  const arrFilter = newPic.filter(
                    (picture) => picture.name === files.name
                  );
                  return arrFilter;
                }
              }
              setPictures(arrFilter);
              setAvatarOffer(URL.createObjectURL(e.target.files[0]));
            }
            setPictures(e.target.files[0]);
            setAvatarOffer(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </label>
      {pictures ? <div>{pictures.name}</div> : null}
    </div>
  );
};

export default InputFileOffer;

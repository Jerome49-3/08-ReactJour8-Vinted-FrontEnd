import { Fragment } from "react";
import Image from "./Image";

const InputArrayPictures = ({
  labelTxt,
  pictures,
  setPictures,
  avatarOffer,
  setAvatarOffer,
}) => {
  const handleChangeInputPictures = (e, index) => {
    // console.log("index on handleChangeInputPictures:", index);
    console.log(e.target.files);
    const file = e.target.files[0];
    if (file) {
      const newPictures = [...pictures];
      newPictures.splice(index, 1, file);
      setPictures(newPictures);

      const newAvatars = [...avatarOffer];
      newAvatars.splice(index, 1, URL.createObjectURL(file));
      setAvatarOffer(newAvatars);
    }
  };

  return (
    <Fragment>
      {pictures?.map((pic, index) => {
        // console.log("pic in OfferIdUpdateAndDelete:", pic);
        console.log("index in OfferIdUpdateAndDelete:", index);
        return (
          <div className="boxPictures" key={index}>
            <Image
              alt="avatarOffer"
              src={avatarOffer[index]?.secure_url || avatarOffer[index]}
            />
            <input
              id={`pictureIndexhidden_${index}`}
              type="hidden"
              name={`pictureIndexhidden_${index}`}
              value={index}
            />
            <label htmlFor={`pictureIndex_${index}`}>
              {labelTxt}
              <input
                id={`pictureIndex_${index}`}
                name={`pictureIndex_${index}`}
                type="file"
                onChange={(e) => handleChangeInputPictures(e, index)}
              />
            </label>
          </div>
        );
      })}
    </Fragment>
  );
};

export default InputArrayPictures;

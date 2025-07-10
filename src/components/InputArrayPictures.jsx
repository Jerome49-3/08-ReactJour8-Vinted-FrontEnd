import { Fragment } from "react";
import Image from "./Image";

const InputArrayPictures = ({
  labelTxt,
  pictures,
  setPictures,
  avatarOffer,
  setAvatarOffer,
  imgSupp,
  setImgSupp,
}) => {
  const handleChangeInputPictures = (e, index) => {
    const file = e.target.files[0];
    // console.log(
    //   "file in handleChangeInputPictures OfferIdUpdateAndDelete:",
    //   file
    // );
    if (file) {
      const newImgSupp = [...imgSupp];
      const newPictures = [...pictures];
      let pictSupp = newPictures.splice(index, 1, file);
      // console.log(
      //   "pictSupp in handleChangeInputPictures on InputArrayPictures:",
      //   pictSupp
      // );
      // console.log(
      //   "pictSupp[0].public_id in handleChangeInputPictures on InputArrayPictures:",
      //   pictSupp[0].public_id
      // );
      const infoSuppImg = {
        indexImgSupp: index,
        imgSuppPublicId: pictSupp[0].public_id,
      };
      // console.log(
      //   "infoSuppImg in handleChangeInputPictures on InputArrayPictures:",
      //   infoSuppImg
      // );
      newImgSupp.push(infoSuppImg);
      setImgSupp(newImgSupp);
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
        // console.log("index in OfferIdUpdateAndDelete:", index);
        return (
          <div className="boxArrayPictures" key={index}>
            <Image
              alt="avatarOffer"
              src={avatarOffer[index]?.secure_url || avatarOffer[index]}
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

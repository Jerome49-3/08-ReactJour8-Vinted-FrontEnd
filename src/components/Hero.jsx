import HeroBanner from "../assets/images/hero-24963eb2.jpg";
import Strech from "../assets/images/tear.svg";
import StrechBlack from "../assets/images/tearBlack.svg";
import Image from "./Image";
import { ThemeContext } from "../context/ThemeProvider";
import { useContext, useEffect, useRef } from "react";

//lib
import listenDimDiv from "../assets/lib/listenDimDiv";
import addRemoveListener from "../assets/lib/addRemoveListener";

const Hero = ({ isLoading, setDimDiv }) => {
  const { darkMode } = useContext(ThemeContext);
  // console.log("darkMode in Hero:", darkMode);

  const refDiv = useRef(0);

  useEffect(() => {
    if (isLoading !== true) {
      return addRemoveListener("load", () => {
        listenDimDiv(refDiv, setDimDiv);
      });
    }
  }, [isLoading]);

  return (
    <div className="boxImgs" ref={refDiv}>
      <Image src={HeroBanner} alt="banner" classImg="imgBanner" />
      {darkMode ? (
        <Image src={StrechBlack} alt="banner" classImg="imgBannerBottom" />
      ) : (
        <Image src={Strech} alt="banner" classImg="imgBannerBottom" />
      )}
    </div>
  );
};

export default Hero;

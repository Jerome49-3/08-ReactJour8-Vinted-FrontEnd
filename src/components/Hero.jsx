import HeroBanner from '../assets/images/hero-24963eb2.jpg';
import Strech from '../assets/images/tear.svg';
import StrechBlack from '../assets/images/tearBlack.svg'
import Image from './Image';
import { ThemeContext } from "../context/ThemeProvider";
import { useContext } from "react";

const Hero = () => {
  const { darkMode } = useContext(ThemeContext);
  // console.log('darkMode in Hero:', darkMode);

  return (
    <div className="boxImgs">
      <Image src={HeroBanner} alt='banner' classImg='imgBanner' />
      {darkMode ? (<Image src={StrechBlack} alt='banner' classImg='imgBannerBottom' />) : (<Image src={Strech} alt='banner' classImg='imgBannerBottom' />)}
    </div>
  )
}

export default Hero
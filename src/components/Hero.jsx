import HeroBanner from '../assets/images/hero-24963eb2.jpg';
import Strech from '../assets/images/tear.svg';
import Image from './Image';

const Hero = () => {
  return (
    <div className="boxImgs">
      <Image src={HeroBanner} alt='banner' classImg='imgBanner' />
      <Image src={Strech} alt='banner' classImg='imgBannerBottom' />
    </div>
  )
}

export default Hero
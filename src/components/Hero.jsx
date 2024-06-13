import HeroBanner from '../assets/images/hero-24963eb2.jpg';
import Strech from '../assets/images/tear.svg';
import Image from './Image';

const Hero = () => {
  return (
    <div className="boxImgs">
      <div>
        <Image src={HeroBanner} alt='banner' classImg='imgBanner' />
      </div>
      <div>
        <Image src={Strech} alt='banner' classImg='imgBannerBottom' />
      </div>
    </div>
  )
}

export default Hero
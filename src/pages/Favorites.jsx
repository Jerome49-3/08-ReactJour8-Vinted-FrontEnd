import { useUser } from "../assets/lib/userFunc";
//components
import OfferCard from "../components/OfferCard";
const Favorites = ({ faHeart, farHeart }) => {
  const { fav, setFav } = useUser();
  return (
    <div className="wrapper">
      <OfferCard
        fav={fav}
        setFav={setFav}
        faHeart={faHeart}
        farHeart={farHeart}
      />
    </div>
  );
};

export default Favorites;

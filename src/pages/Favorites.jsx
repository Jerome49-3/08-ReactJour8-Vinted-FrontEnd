import { useUser } from "../assets/lib/userFunc";
//components
import OfferCard from "../components/OfferCard";
import Links from "../components/Links";
const Favorites = ({ faHeart, farHeart }) => {
  const { fav, setFav } = useUser();
  return (
    <>
      <div className="boxFavorites">
        <div className="wrapper">
          {fav.length > 0 ? (
            <OfferCard
              fav={fav}
              setFav={setFav}
              faHeart={faHeart}
              farHeart={farHeart}
            />
          ) : (
            <div className="boxNoPurchases">
              <p> Vous n'avez pas d'offres en favoris:</p>
              <Links path="/" linkText="Consultez nos offres disponibles" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;

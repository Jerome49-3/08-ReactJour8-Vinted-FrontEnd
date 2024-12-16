//components
import FavCards from "../components/FavCards";
const Favorites = ({ fav, setFav, faHeart, farHeart }) => {
  return (
    <div className="boxFavorites">
      <FavCards
        fav={fav}
        setFav={setFav}
        faHeart={faHeart}
        farHeart={farHeart}
      />
    </div>
  );
};

export default Favorites;

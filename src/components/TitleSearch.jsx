import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../components/Input";

const TitleSearch = ({ value, setState, title, txtPlaceholder }) => {
  console.log("value in TitleSearch:", value);

  return (
    <div className="boxTitleSearch">
      <h2>{title}</h2>
      <div className="containerBoxSearch">
        <div className="boxSearch">
          <Input
            id="search"
            type="search"
            placeholder={txtPlaceholder}
            value={value || ""}
            setState={setState}
          />
          <FontAwesomeIcon icon="magnifying-glass" className="searchIcons" />
        </div>
      </div>
    </div>
  );
};

export default TitleSearch;

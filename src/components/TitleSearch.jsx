import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../components/Input";

const TitleSearch = ({
  valueStr,
  setStateStr,
  title,
  txtPlaceholder,
  txtNumber,
  valueNum,
  setStateNum,
}) => {
  console.log("value in TitleSearch:", valueStr);
  console.log("valueNum in TitleSearch:", valueNum);
  return (
    <div className="boxTitleSearch">
      <h2>{title}</h2>
      <div className="containerBoxSearch">
        <div className="boxSearch">
          <Input
            id="search"
            type="search"
            placeholder={txtPlaceholder}
            value={valueStr || ""}
            setState={setStateStr}
          />
          {setStateNum && txtNumber && (
            <Input
              id="search"
              type="search"
              placeholder={txtNumber}
              value={valueNum || ""}
              setState={setStateNum}
            />
          )}
          <FontAwesomeIcon icon="magnifying-glass" className="searchIcons" />
        </div>
      </div>
    </div>
  );
};

export default TitleSearch;

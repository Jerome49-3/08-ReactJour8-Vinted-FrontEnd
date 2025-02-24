/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Input from "./Input";

const PriceMinMaxInput = ({ priceMin, setPriceMin, priceMax, setPriceMax }) => {
  // console.log("priceMin in PriceMinMaxInput:", priceMin);
  // console.log("priceMax in PriceMinMaxInput:", priceMax);
  useEffect(() => {
    setPriceMax("");
    setPriceMin("");
  }, []);

  return (
    <div className="boxPriceMinMax">
      <h3>Filters:</h3>
      <div className="boxInputFilter">
        <div className="priceMin">
          <Input
            id="priceMin"
            type="number"
            placeholder="0"
            value={priceMin}
            setState={setPriceMin}
            classInput="inputPriceMin"
            label="Prix min"
            min="0"
            max="100000"
          />
        </div>
        <div className="priceMax">
          <Input
            id="priceMax"
            type="number"
            placeholder="100000"
            value={priceMax}
            setState={setPriceMax}
            classInput="inputPriceMax"
            label="Prix max"
            min="0"
            max="100000"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceMinMaxInput;

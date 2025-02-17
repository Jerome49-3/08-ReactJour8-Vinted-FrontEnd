import * as React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 1000;
const MIN = 0;
const MAX = 100000;

interface Props {
  rtl: boolean;
  priceMin: number;
  setPriceMin: (value: number) => void;
  priceMax: number;
  setPriceMax: (value: number) => void;
}


const LabeledTwoThumbs: React.FC<Props> = ({ rtl, priceMin, setPriceMin, priceMax, setPriceMax }) => {
  const [values, setValues] = React.useState([0, 100000]);

  React.useEffect(() => {
    setPriceMin(values[0]);
    setPriceMax(values[1]);
  }, [values]);

  console.log('values:', values)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#375b31", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              backgroundColor: "#2DB0BA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 4px #000",
            }} className="dotBarPrice"
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                width: "fit-content",
                height: "20px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "5px",
                backgroundColor: "#375b31",
              }} className="dotBarLabel"
            >
              {values[index]}€
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default LabeledTwoThumbs;
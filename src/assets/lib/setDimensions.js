const setDimensions = (setDimWindows) => {
  try {
    const widthWindows = window.innerWidth;
    const heightWindows = window.innerHeight;
    console.log("widthWindows in userProvider:", widthWindows);
    console.log("heightWindows in userProvider:", heightWindows);
    setDimWindows({ width: widthWindows, height: heightWindows });
  } catch (error) {
    console.log("error in setDimensions:", error);
  }
};
export default setDimensions;

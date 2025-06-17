const setDimensions = (setDimWindows) => {
  try {
    const widthWindows = window.innerWidth;
    const heightWindows = window.innerHeight;
    // console.log(
    //   "%cWidthWindows in setDimensions:",
    //   "color: cyan",
    //   widthWindows
    // );
    // console.log(
    //   "%cHeightWindows in setDimensions:",
    //   "color: cyan",
    //   heightWindows
    // );
    setDimWindows({
      width: widthWindows,
      height: heightWindows,
      fixWidth: document.documentElement.style.setProperty(
        "--fixWidth",
        widthWindows + "px"
      ),
      fixHeight: document.documentElement.style.setProperty(
        "--fixHeight",
        heightWindows + "px"
      ),
    });
  } catch (error) {
    console.log("error in setDimensions:", error);
  }
};
export default setDimensions;

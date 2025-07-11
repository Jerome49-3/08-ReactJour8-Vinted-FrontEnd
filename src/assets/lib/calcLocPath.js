const calcLocPath = (pathUseLocation) => {
  try {
    const path = window.location.pathname || pathUseLocation;
    console.log("path in app", path);
    const divRoot = document.getElementById("root");

    if (path.includes("/profile") || path.includes("/offers/")) {
      divRoot.classList.add("rootHeight");
    } else if (path.includes("/myOffers") || path.includes("/")) {
      divRoot.classList.remove("rootHeight");
    }
  } catch (error) {
    console.error("error in calcLocPath:", error);
  }
};
export default calcLocPath;

// const [dimDiv, setDimDiv] = useState({});

const listenDimDiv = (refDiv, setDimDiv) => {
  try {
    const getDimDiv = refDiv.current.getBoundingClientRect();
    console.log("%cGetDimDiv:", "color: green", getDimDiv);
    const height = getDimDiv.height;
    const width = getDimDiv.width;
    console.log("%cheight:", "color: magenta", height);
    setDimDiv({
      height: document.documentElement.style.setProperty(
        "--divHeight",
        height + "px"
      ),
      width: document.documentElement.style.setProperty(
        "--divWidth",
        width + "px"
      ),
    });
  } catch (error) {
    console.error(error);
  }
};
export default listenDimDiv;

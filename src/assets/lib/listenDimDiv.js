// const [dimDiv, setDimDiv] = useState({});

const listenDimDiv = (refDiv, setDimDiv) => {
  try {
    const getDimDiv = refDiv.current.getBoundingClientRect();
    console.log("%cGetDimDiv:", "color: green", getDimDiv);
    const height = getDimDiv.height;
    console.log("%cheight:", "color: magenta", height);
    setDimDiv({
      height: document.documentElement.style.setProperty(
        "--divHeight",
        height + "px"
      ),
    });
  } catch (error) {
    console.error(error);
  }
};
export default listenDimDiv;

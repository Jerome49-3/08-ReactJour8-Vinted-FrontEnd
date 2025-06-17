const addRemoveListener = (event, callback) => {
  // console.log("listener on removeListenerGen:", listener);
  // console.log("typeof listener on removeListenerGen:", typeof listener);
  window.addEventListener(event, callback);
  return () => window.removeEventListener(event, callback);
};
export default addRemoveListener;

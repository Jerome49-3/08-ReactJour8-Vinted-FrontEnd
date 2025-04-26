const addRemoveListener = (listener, stateListener, funcListener) => {
  console.log("listener on removeListenerGen:", listener);
  console.log("typeof listener on removeListenerGen:", typeof listener);
  window.addEventListener(listener, (e) => {
    console.log("listen listenerEvent on removeListenerGen:", e);
    stateListener(funcListener);
  });
  return () =>
    window.removeEventListener(listener, stateListener(funcListener));
};
export default addRemoveListener;

const transformStr = (e) => {
  try {
    let targetValueFinal;
    const targetValue = e.target.value;
    const stringLength = targetValue.length;
    const firstCharacter = targetValue.substr(0, 1);
    const firstCharacterMaj = firstCharacter.toUpperCase();
    const EndStringSplit = targetValue.substr(1, stringLength);
    const EndStringLow = EndStringSplit.toLowerCase();
    targetValueFinal = firstCharacterMaj + EndStringLow;
    return targetValueFinal;
  } catch (error) {
    console.error("error in transformStr:", error);
  }
};
export default transformStr;

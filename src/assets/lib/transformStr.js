const transformStr = (e) => {
  try {
    let targetValueFinal;
    const targetValue = e.target.value;
    const stringLength = targetValue.length;
    console.log("stringLength in handleChange:", stringLength);
    const firstCharacter = targetValue.substr(0, 1);
    console.log("firstCharacter in handleChange:", firstCharacter);
    const firstCharacterMaj = firstCharacter.toUpperCase();
    console.log("firstCharacterMaj in handleChange:", firstCharacterMaj);
    const EndStringSplit = targetValue.substr(1, stringLength);
    console.log("EndStringSplit in handleChange:", EndStringSplit);
    const EndStringLow = EndStringSplit.toLowerCase();
    console.log("EndStringLow in handleChange:", EndStringLow);
    targetValueFinal = firstCharacterMaj + EndStringLow;
    console.log("targetValueFinal in handleChange:", targetValueFinal);
    return targetValueFinal;
  } catch (error) {
    console.error("error in transformStr:", error);
  }
};
export default transformStr;

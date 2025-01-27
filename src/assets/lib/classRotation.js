const classRotation = (data, article, images) => {
  try {
    const rotation =
      data?.product_image?.rotation ||
      article?.product_image?.rotation ||
      images?.rotation ||
      0;
    return rotation;
  } catch (error) {
    console.error(error);
  }
};
export default classRotation;

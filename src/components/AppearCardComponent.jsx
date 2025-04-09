const AppearCardComponent = ({
  children,
  article,
  showCardsOffers,
  setShowCardsOffers,
}) => {
  console.log("article in AppearCardComponent:", article);
  let classAppearCards = "dispNone";
  if (showCardsOffers) {
    classAppearCards += " out";
  }

  return <article className={classAppearCards}>{children}</article>;
};

export default AppearCardComponent;

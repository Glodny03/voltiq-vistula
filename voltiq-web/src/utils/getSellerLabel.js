export const getSellerLabel = (sellerType) => {
  if (!sellerType) return "";

  return sellerType === "dealer" ? "Dealer" : "Osoba prywatna";
};

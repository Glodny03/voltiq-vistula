export function formatPricePLN(value) {
  return value.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export const formatPriceInput = (value) => {
  if (!value) return "";
  return Number(value).toLocaleString("pl-PL");
};

export const parsePriceInput = (value) => {
  if (!value) return "";

  return value.replace(/\s/g, "").replace(/[^\d]/g, "").slice(0, 9);
};

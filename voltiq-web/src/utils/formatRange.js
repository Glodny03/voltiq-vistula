export const normalizeRange = (min, max) => {
  const minVal = Number(min);
  const maxVal = Number(max);

  if (!minVal || !maxVal) {
    return { min, max };
  }

  if (minVal > maxVal) {
    return {
      min: maxVal,
      max: minVal,
    };
  }

  return { min: minVal, max: maxVal };
};

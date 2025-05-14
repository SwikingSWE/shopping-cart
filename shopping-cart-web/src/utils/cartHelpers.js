const isSameVariant = (a, b) =>
  a.id === b.id &&
  JSON.stringify(a.selectedOptions) === JSON.stringify(b.selectedOptions);

export const findCartItem = (items, id, selectedOptions) =>
  items.find((item) => isSameVariant(item, { id, selectedOptions }));

export const removeCartItem = (items, id, selectedOptions) =>
  items.filter((item) => !isSameVariant(item, { id, selectedOptions }));

export const formatSelectedOptions = (options) => {
  if (!options) return "";
  const parts = Object.entries(options).map(
    ([key, value]) => `${key}: ${value}`
  );
  return `(${parts.join(", ")})`;
};

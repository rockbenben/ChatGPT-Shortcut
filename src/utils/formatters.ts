export const getWeight = (item: { count?: number; weight?: number }) => {
  const value = item.count ?? item.weight ?? 0;
  return value;
};

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});

export const formatCompactNumber = (count: number) => {
  return compactFormatter.format(count);
};

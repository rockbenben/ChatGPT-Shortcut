export const getWeight = (item: { count?: number; weight?: number }) => {
  const value = item.count ?? item.weight ?? 0;
  return value;
};

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});

export const formatCompactNumber = (count) => {
  return compactFormatter.format(count);
};

// truncate
const MAX_LENGTH = 200;
export const truncate = (str: string, num: number = MAX_LENGTH): string => (str.length <= num ? str : `${str.slice(0, num)}...`);

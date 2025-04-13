export const getWeight = (item: { count?: number; weight?: number }) => {
  const value = item.count ?? item.weight ?? 0;
  return value;
};

export const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();
};

// truncate
export const MAX_LENGTH = 200;
export const truncate = (str: string, num: number = MAX_LENGTH): string => (str.length <= num ? str : `${str.slice(0, num)}...`);

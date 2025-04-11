export const formatCopyCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count;
};

// truncate
export const MAX_LENGTH = 200;
export const truncate = (str: string, num: number = MAX_LENGTH): string => (str.length <= num ? str : `${str.slice(0, num)}...`);

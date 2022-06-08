export const formatTwoDecimals = (value: string | number): number => {
  const number = Number(value);
  return Math.round(number * 100) / 100;
};

export const formatNumsToString = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

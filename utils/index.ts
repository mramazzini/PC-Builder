export const mapValueToBudget = (value: number): number => {
  if (value < 50) {
    return 500 + value * 10;
  } else {
    return 1000 + (value - 50) * 100;
  }
};

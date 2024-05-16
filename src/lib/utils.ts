export const mapValueToBudget = (value: number): number => {
  if (value < 50) {
    return 500 + value * 10;
  } else {
    return 1000 + (value - 50) * 100;
  }
};
export function keysOfTrueBooleans(obj: any) {
  let result = "";
  for (let key in obj) {
    if (obj[key]) {
      if (result !== "") {
        result += ", ";
      }
      result += key;
    }
  }
  return result;
}
export const camelCaseToTitleCase = (str: string) => {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

import { AuthResult } from "./types";

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

export const idToCode = (id: number): string => {
  return id.toString(36).toUpperCase();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export const validateSecureString = (
  str: string,
  confirmStr: string
): AuthResult => {
  if (str !== confirmStr) {
    return AuthResult.PasswordsDoNotMatch;
  }
  if (str.length < 8) {
    return AuthResult.PasswordTooShort;
  }
  return AuthResult.Success;
};

export function searchItems<T>(
  items: T[],
  searchFields: (keyof T)[],
  query: string
): T[] {
  if (query.trim() === "") {
    return [];
  }

  return items.filter((item) =>
    searchFields.some((field) =>
      String(item[field]).toLowerCase().includes(query.toLowerCase())
    )
  );
}

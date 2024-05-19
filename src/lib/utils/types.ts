export enum AuthResult {
  InvalidCredentials = "Invalid Credentials",
  UserNotFound = "User Not Found",
  UserAlreadyExists = "User Already Exists",
  PasswordsDoNotMatch = "Passwords Do Not Match",
  PasswordTooShort = "Password Too Short, Must Be At Least 8 Characters",
  TokenExpired = "Token Expired",
  Success = "Success",
}

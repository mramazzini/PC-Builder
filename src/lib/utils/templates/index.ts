"use server";
import fs from "fs";
import path from "path";
export async function verifyEmail(verificationCode: string, email: string) {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "lib",
    "utils",
    "templates",
    "verifyEmail.html"
  );

  const template = fs.readFileSync(templatePath, "utf8");
  return template
    .replace("${verificationCode}", verificationCode)
    .replace("${email}", email);
}

export async function questionnaireEntryEmail(code: string) {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "lib",
    "utils",
    "templates",
    "questionnaireEntry.html"
  );
  console.log(process.cwd(), templatePath);
  const template = fs.readFileSync(templatePath, "utf8");
  return template.replace("${code}", code);
}

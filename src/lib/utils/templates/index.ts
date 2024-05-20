"use server";
import fs from "fs";

export async function verifyEmail(verificationCode: string, email: string) {
  const template = fs.readFileSync(
    "./src/lib/utils/templates/verifyEmail.html",
    "utf8"
  );
  return template
    .replace("${verificationCode}", verificationCode)
    .replace("${email}", email);
}

export async function questionnaireEntryEmail(code: string) {
  const template = fs.readFileSync(
    "./src/lib/utils/templates/questionnaireEntry.html",
    "utf8"
  );
  return template.replace("${code}", code);
}

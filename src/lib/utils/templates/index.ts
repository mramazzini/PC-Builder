"use server";
import fs from "fs";
import path from "path";
export async function verifyEmail(verificationCode: string, email: string) {
  const templatePath = await createPath("questionnaireEntry.html");
  const template = await fs.readFileSync(templatePath, "utf8");
  return template
    .replace("${verificationCode}", verificationCode)
    .replace("${email}", email);
}

export async function questionnaireEntryEmail(code: string) {
  const templatePath = await createPath("questionnaireEntry.html");
  const template = await fs.readFileSync(templatePath, "utf8");
  return template.replace("${code}", code);
}

export async function createPath(filename: string) {
  const directory = process.cwd() + "/public/templates";
  const filePath = path.join(directory, filename);

  return filePath;
}

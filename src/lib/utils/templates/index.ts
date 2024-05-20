"use server";
import { promises as fs } from "fs";
import path from "path";
export async function verifyEmail(verificationCode: string, email: string) {
  const templatePath = await findFile("questionnaireEntry.html");
  const template = await fs.readFile(templatePath, "utf8");
  return template
    .replace("${verificationCode}", verificationCode)
    .replace("${email}", email);
}

export async function questionnaireEntryEmail(code: string) {
  const templatePath = await findFile("questionnaireEntry.html");
  const template = await fs.readFile(templatePath, "utf8");
  return template.replace("${code}", code);
}

export async function findFile(filename: string) {
  const directory = path.resolve(process.cwd(), "public/templates");
  const filePath = path.join(directory, filename);

  return filePath;
}

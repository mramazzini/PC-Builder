"use server";
import fs from "fs";
import path from "path";
export async function verifyEmail(verificationCode: string, email: string) {
  const templatePath = await findFile("questionnaireEntry.html");
  const template = fs.readFileSync(templatePath, "utf8");
  return template
    .replace("${verificationCode}", verificationCode)
    .replace("${email}", email);
}

export async function questionnaireEntryEmail(code: string) {
  const templatePath = await findFile("questionnaireEntry.html");
  const template = fs.readFileSync(templatePath, "utf8");
  return template.replace("${code}", code);
}

export async function findFile(filename: string) {
  const directory = path.resolve(process.cwd(), "public/templates");
  const filePath = path.join(directory, filename);

  if (fs.existsSync(filePath)) {
    console.log(`File found: ${filePath}`);
    return filePath;
  }

  throw new Error("Template not found");
}

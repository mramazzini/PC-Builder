"use server";
import fs from "fs";
import path from "path";
export async function verifyEmail(verificationCode: string, email: string) {
  const templatePath = await findFile("verifyEmail.html", process.cwd());
  if (!templatePath) {
    throw new Error("Template not found");
  }
  const template = fs.readFileSync(templatePath, "utf8");
  return template
    .replace("${verificationCode}", verificationCode)
    .replace("${email}", email);
}

export async function questionnaireEntryEmail(code: string) {
  const templatePath = await findFile("questionnaireEntry.html", process.cwd());
  if (!templatePath) {
    throw new Error("Template not found");
  }
  console.log(await findFile("questionnaireEntry.html", process.cwd()));
  const template = fs.readFileSync(templatePath, "utf8");
  return template.replace("${code}", code);
}

export async function findFile(filename: string, directory = __dirname) {
  function searchDir(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const temp: string = searchDir(filePath);
        if (temp) {
          return temp;
        }
      } else if (file === filename) {
        console.log(`File found: ${filePath}`);
        return filePath;
      }
    }
    return "";
  }

  return searchDir(directory);
}

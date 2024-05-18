"use server";
import fs from "fs";
import path from "path";

export async function verifyEmail(name: string) {
  const template = fs.readFileSync(
    path.resolve(__dirname, "./verifyEmail.html"),
    "utf8"
  );
  return template.replace("${name}", name);
}

export async function questionnaireEntryEmail(code: string) {
  const template = fs.readFileSync(
    "./src/lib/utils/templates/questionnaireEntry.html",
    "utf8"
  );
  return template.replace("${code}", code);
}

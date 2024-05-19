"use server";
import { QuestionnaireEntry } from "@prisma/client";
import AWS from "aws-sdk";
import { camelCaseToTitleCase } from "../../utils/helpers";
import { resolve } from "path";
import { questionnaireEntryEmail, verifyEmail } from "../../utils/templates";
import { randomUUID } from "crypto";
// Set up AWS SES
const ses = new AWS.SES({
  region: "us-east-2", // e.g., 'us-east-1'
  accessKeyId: process.env.SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export const sendQuestionnaireEmail = async (
  data: QuestionnaireEntry
): Promise<boolean> => {
  // Define email parameters

  const params = {
    Destination: {
      ToAddresses: [data.email], // Email addresses to send the email to
    },
    Message: {
      Body: {
        Html: {
          Data: await questionnaireEntryEmail(data.id), // Email content in HTML
        },
      },
      Subject: {
        Data: "Request for PC Quote Recieved!", // Email subject
      },
    },
    Source: "mramazzini123@gmail.com", // Email address of the sender
  };

  // Send the email
  return new Promise((resolve) => {
    ses.sendEmail(params, async (err, data) => {
      if (err) {
        console.error("Error sending email:", err);
        resolve(false);
      } else {
        console.log("Email sent successfully:", data);
        resolve(true);
      }
    });
  });
};

export const sendAccountConfirmationEmail = async (
  email: string
): Promise<boolean> => {
  return true;
};
// const params = {
//   Destination: {
//     ToAddresses: [email], // Email addresses to send the email to
//   },
//   Message: {
//     Body: {
//       Html: {
//         Data: await verifyEmail(), // Email content in HTML
//       },
//     },

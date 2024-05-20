"use server";
import { QuestionnaireEntry } from "@prisma/client";
import AWS from "aws-sdk";

import { questionnaireEntryEmail, verifyEmail } from "../../utils/templates";

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
  email: string,
  verificationCode: string
): Promise<boolean> => {
  const params = {
    Destination: {
      ToAddresses: [email], // Email addresses to send the email to
    },
    Message: {
      Body: {
        Html: {
          Data: await verifyEmail(verificationCode, email), // Email content in HTML
        },
      },
      Subject: {
        Data: "Verify your email address", // Email subject
      },
    },
    Source: "mramazzini123@gmail.com", // Email address of the sender
  };

  // Send the email
  return new Promise((resolve) => {
    ses.sendEmail(params, async (err, data) => {
      if (err) {
        console.error("Error sending email:", err);
        console.log(params);
        resolve(false);
      } else {
        console.log("Email sent successfully:", data);
        resolve(true);
      }
    });
  });
};

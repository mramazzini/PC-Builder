"use client";
import {
  verifyEmailToken,
  resetVerificationToken,
} from "../lib/actions/db/auth/signup.actions";
import { QStatus, User } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Link from "next/link";
const VerificationBody = () => {
  // get the confirmation code from the query string
  const params = useSearchParams();
  const confirmationCode = params.get("code");
  const email = params.get("email");

  const [inputEmail, setInputEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (confirmationCode && email) {
      processVerification(confirmationCode, email);
    }
  }, [confirmationCode]);

  const processVerification = (code: string, emailAddress: string) => {
    verifyEmailToken(emailAddress, code).then((result) => {
      setSuccess(result);
    });
  };
  const handleResend = async (event: React.FormEvent) => {
    event.preventDefault(); // prevent the form from refreshing the page
    setLoading(true);
    if (inputEmail) {
      await resetVerificationToken(inputEmail);
      setLoading(false);
      setEmailSent(true);
    }
  };
  return success ? (
    // Confirmation code available
    <div className="bg-base-100 p-8 mt-8 border rounded-xl border-accent">
      <h1 className="text-4xl font-bold text-center">
        Verification Successful!
        <div className="divider "></div>
      </h1>
      <p className="text-center mt-4 text-xl">
        Your account has been verified!
      </p>

      <div className="divider "></div>
      <Link
        href="/dashboard"
        className="text-center mt-4 text-xl btn btn-primary btn-lg w-full text-white"
      >
        Go to Dashboard
      </Link>
    </div>
  ) : (
    //No confirmation code available or email
    <form
      className="bg-base-100 p-8 mt-8 border rounded-xl border-accent"
      onSubmit={handleResend}
    >
      <h1 className="text-4xl font-bold text-center">
        Verification Failed
        <div className="divider "></div>
      </h1>
      <p className="text-center mt-4 text-xl">
        The verification code is invalid or has expired.
      </p>
      <div className="divider "></div>
      <h3 className="text-2xl font-bold text-center">
        Resend Verification Code
      </h3>
      <p className="text-center my-4 text-xl">
        Enter your email address below to receive a new verification code.
      </p>
      <div className="form-control">
        <input
          type="email"
          placeholder="Email"
          className="input input-info"
          name="email"
          required
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
      </div>

      <div className="divider "></div>
      {emailSent ? (
        <p className="text-center text-xl font-bold text-success">
          Email sent! <br /> Please check your inbox.
        </p>
      ) : Loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <button className="text-center mt-4 text-xl btn btn-primary btn-lg w-full text-white">
          Submit
        </button>
      )}
    </form>
  );
};
export default VerificationBody;

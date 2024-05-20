"use client";
import { getQuestionnaireEntry } from "@/src/lib/actions/db/get.actions";
import { QStatus, QuestionnaireEntry } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
const StatusBody = () => {
  // get the confirmation code from the query string
  const params = useSearchParams();
  const confirmationCode = params.get("code");

  // get the questionnaire entry from the database
  const [questionnaireEntry, setQuestionnaireEntry] =
    useState<QuestionnaireEntry | null>(null);
  const [codeEntry, setCodeEntry] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  useEffect(() => {
    if (confirmationCode) {
      setEntry(confirmationCode);
    }
  }, [confirmationCode]);

  const setEntry = (c: string) => {
    getQuestionnaireEntry(c).then((entry) => {
      console.log(entry);
      if (!entry) return setInvalid(true);
      setQuestionnaireEntry(entry);
    });
  };
  return questionnaireEntry ? (
    // Confirmation code available
    <div className="bg-base-100 p-8 rounded-box mt-8 border border-accent">
      <h1 className="text-4xl font-bold text-center">
        Your request status
        <div className="divider "></div>
      </h1>
      <p className="text-center mt-4">
        Your request with confirmation code{" "}
        <span className="font-bold">{confirmationCode}</span> is currently{" "}
        <span className="font-bold">{QStatus[questionnaireEntry.status]}</span>
      </p>
      <p className="text-center mt-4">
        You can expect a response from us within 24 hours at your email:{" "}
        <span className="font-bold">{questionnaireEntry.email}</span>
      </p>
      <div className="divider "></div>
    </div>
  ) : (
    //No confirmation code available - request confirmation code
    <div className="bg-base-100 p-8 rounded-box mt-8 border border-accent">
      <h1 className="mb-5 text-5xl font-bold">Request Status</h1>
      <div className="divider "></div>
      <p className="text-center mt-4">
        Please enter your confirmation code to check the status of your request
      </p>
      <input
        type="text"
        className="input input-primary input-bordered w-full mt-4"
        placeholder="Confirmation code"
        value={codeEntry}
        onChange={(e) => setCodeEntry(e.target.value)}
      />
      <div className="divider "></div>
      {invalid && (
        <div>
          <p className="text-center text-error font-bold text-xl mb-2">
            Invalid confirmation code!
          </p>
          <p className="text-center ">
            Please check your email for the correct confirmation code
          </p>
          {/*example of code*/}
          <p className="text-center mb-2">
            Code looks like:{" "}
            <span className="font-bold">
              12345678-abcd-efgh-ijkl-qwertyuiopas
            </span>
          </p>
          <p className="text-center ">
            <Link href="/login" className="text-center text-info font-bold">
              <div className="font-bold">
                Alternatively, you can access and edit your request by logging
                in!
              </div>
              Log in here!
            </Link>
          </p>
          <div className="divider "></div>
        </div>
      )}
      <button
        className="btn btn-accent "
        onClick={() => {
          setEntry(codeEntry);
        }}
      >
        Check status
      </button>
    </div>
  );
};
export default StatusBody;

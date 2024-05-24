"use client";
import { useEffect, useState } from "react";
import {
  mapValueToBudget,
  keysOfTrueBooleans,
  camelCaseToTitleCase,
} from "@/src/lib/utils/helpers";
import Image from "next/image";
import { createQuestionnaireEntry } from "@/src/lib/actions/db/create.actions";
import { Prisma } from "@prisma/client";
import { sendQuestionnaireEmail } from "@/src/lib/actions/email/send.actions";
import { type } from "os";

export default function Page() {
  const [data, setData] = useState<{
    minBudget: number;
    maxBudget: number;
    email: string;
    usage: {
      gaming: boolean;
      work: boolean;
      streaming: boolean;
      editing: boolean;
      other: boolean;
    };
    otherUsage: string;
    performance: {
      highFPS: boolean;
      highResolution: boolean;
      lowLatency: boolean;
      highRefreshRate: boolean;
      otherPerformance: boolean;
    };
    otherPerformance: string;
    aesthetic: {
      minimalistic: boolean;
      rgb: boolean;
      colorful: boolean;
      other: boolean;
    };
    otherAesthetic: string;
    other: string;
  }>({
    minBudget: 0,
    maxBudget: 6000,
    email: "",
    usage: {
      gaming: true,
      work: false,
      streaming: false,
      editing: false,
      other: false,
    },
    otherUsage: "",
    performance: {
      highFPS: true,
      highResolution: false,
      lowLatency: false,
      highRefreshRate: false,
      otherPerformance: false,
    },
    otherPerformance: "",
    aesthetic: {
      minimalistic: true,
      rgb: false,
      colorful: false,
      other: false,
    },
    otherAesthetic: "",
    other: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const minBudget = urlParams.get("minBudget");
    const maxBudget = urlParams.get("maxBudget");
    const email = urlParams.get("email");

    if (minBudget && maxBudget && email) {
      setData({
        minBudget: mapValueToBudget(parseInt(minBudget)),
        maxBudget: mapValueToBudget(parseInt(maxBudget)),
        email: email,
        usage: {
          gaming: false,
          work: false,
          streaming: false,
          editing: false,
          other: false,
        },
        otherUsage: "",
        performance: {
          highFPS: false,
          highResolution: false,
          lowLatency: false,
          highRefreshRate: false,
          otherPerformance: false,
        },
        otherPerformance: "",
        aesthetic: {
          minimalistic: false,
          rgb: false,
          colorful: false,
          other: false,
        },
        otherAesthetic: "",
        other: "",
      });
    }
    console.log(data);
  }, []);

  const verifyInput = () => {
    if (data.email === "") {
      alert("Please enter an email address");
      return false;
    }
    if (
      !data.usage.gaming &&
      !data.usage.work &&
      !data.usage.streaming &&
      !data.usage.editing &&
      !data.usage.other
    ) {
      alert("Please select at least one usage option");
      return false;
    }
    if (
      !data.performance.highFPS &&
      !data.performance.highResolution &&
      !data.performance.lowLatency &&
      !data.performance.highRefreshRate &&
      !data.performance.otherPerformance
    ) {
      alert("Please select at least one performance option");
      return false;
    }
    if (
      !data.aesthetic.minimalistic &&
      !data.aesthetic.rgb &&
      !data.aesthetic.colorful &&
      !data.aesthetic.other
    ) {
      alert("Please select at least one aesthetic option");
      return false;
    }
    // check if email is a valid email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    if (data.minBudget > data.maxBudget) {
      alert("Minimum budget cannot be greater than maximum budget");
      return false;
    }

    return true;
  };

  const handleBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    min: boolean
  ) => {
    let value = parseInt(event.target.value.replace("$ ", ""));

    if (event.target.value.replace("$ ", "") === "") {
      value = 0;
    }
    if (isNaN(value)) {
      return;
    }
    if (value < 0) {
      value = 0;
    }
    if (value > 50000) {
      value = 50000;
    }

    if (min) {
      if (value > data.maxBudget) {
        setData({
          ...data,
          maxBudget: value,
          minBudget: value,
        });
      } else {
        setData({
          ...data,
          minBudget: value,
        });
      }
    } else {
      if (value < data.minBudget) {
        setData({
          ...data,
          minBudget: value,
          maxBudget: value,
        });
      } else {
        setData({
          ...data,
          maxBudget: value,
        });
      }
    }
  };

  const toggleShowModal = (show: boolean) => {
    console.log(show);
    if (show) {
      const modal = document.getElementById("confirm_submit_modal") as any;
      console.log(modal);
      modal?.showModal();
    } else {
      const modal = document.getElementById("confirm_submit_modal") as any;
      modal?.close();
    }
  };

  return (
    <main>
      <div className="min-h-screen bg-base-200 flex py-32 flex-col items-center ">
        <div className="hero-overlay bg-opacity-60"></div>
        <form className="w-3/4 bg-base-300 p-10 border border-secondary rounded-3xl">
          <h1 className="text-2xl md:text-5xl font-bold text-center ">
            Make the perfect build!
          </h1>
          <div className="divider md:hidden" />
          <p className="py-6 text-center">
            Once you complete the form, we will begin creating a PC build
            catered to your specific needs. We will contact you with a quote
            within 24 hours.
          </p>
          <div className="divider md:hidden" />
          <div className="md:divider">
            <h2 className="text-lg md:text-3xl font-bold text-center">
              Your Information
            </h2>
          </div>
          <div className="divider md:hidden" />

          <div className="form-row flex flex-row justify-between pb-6">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="input input-bordered input-primary w-full max-w-xs"
                placeholder="Enter email"
              />
            </label>
            <label className="form-control w-full max-w-xs md:ml-4">
              <div className="label">
                <span className="label-text hidden md:flex">
                  Minimum Budget
                </span>
                <span className="label-text hidden md:flex">
                  Maximum Budget
                </span>
                <span className="label-text md:hidden">Budget</span>
              </div>
              <div className="flex justify-between ">
                <input
                  value={`$ ${data.minBudget}`}
                  onChange={(e) => handleBudgetChange(e, true)}
                  className="input input-bordered mr-3 input-primary w-full max-w-xs"
                  placeholder="$ Enter amount"
                />
                <span className="text-2xl flex justify-center items-center ">
                  -
                </span>
                <input
                  value={`$ ${data.maxBudget}`}
                  onChange={(e) => handleBudgetChange(e, false)}
                  className="input input-bordered ml-3 input-primary w-full max-w-xs"
                  placeholder="$ Enter amount"
                />
              </div>
            </label>
          </div>
          <div className="divider md:hidden" />
          <div className="md:divider">
            <h2 className="text-lg md:text-3xl font-bold text-center">
              Your Preferences
            </h2>
          </div>
          <div className="divider md:hidden" />
          <p className="py-6 text-center">
            Please select the options that best suit your needs.{" "}
            <span className="font-bold">
              Don&apos;t worry if you&apos;re not sure!
            </span>{" "}
            Answer as many questions as you can.
          </p>
          <div className="divider" />
          <div className="form-row  w-full">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-lg md:text-xl  mb-4">
                  What will you use the PC for?
                </span>
              </div>

              <ul className="flex flex-col ">
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Gaming</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          usage: {
                            ...data.usage,
                            gaming: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Work</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          usage: {
                            ...data.usage,
                            work: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Streaming</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          usage: {
                            ...data.usage,
                            streaming: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Video Editing</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          usage: {
                            ...data.usage,
                            editing: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Other</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          usage: {
                            ...data.usage,
                            other: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
              </ul>
            </label>
            <div className="divider md:hidden" />
            <div className="divider divider-horizontal" />
            <label className="form-control grow">
              <div className="label">
                <span className="label-text font-bold text-xl  mb-4">
                  Describe any other activities you plan on using your PC for.
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered h-48 textarea-primary"
                placeholder="Write here"
                onChange={(e) => {
                  setData({
                    ...data,
                    otherUsage: e.target.value,
                  });
                }}
              ></textarea>
            </label>
          </div>
          <div className="divider" />
          <div className="form-row  justify-between">
            {/* Performance specifications */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl  mb-4">
                  What performance specifications are you looking for?
                </span>
              </div>
              <ul className="flex flex-col ">
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text flex flex-row justify-center align-center">
                      High FPS
                      <div
                        className="tooltip ml-2"
                        data-tip="Frames (Images) Per Second. Higher FPS defines how many images your computer is able to generate per second. A higher FPS leads to smoother gameplay."
                      >
                        <img
                          src="/info-circle.svg"
                          alt="info"
                          className="h-full w-6"
                        />
                      </div>
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          performance: {
                            ...data.performance,
                            highFPS: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text flex flex-row justify-center align-center">
                      High Resolution
                      <div
                        className="tooltip ml-2"
                        data-tip="Quality of the image on your monitor. Measured in pixels."
                      >
                        <img
                          src="/info-circle.svg"
                          alt="info"
                          className="h-full w-6"
                        />
                      </div>
                    </span>

                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          performance: {
                            ...data.performance,
                            highResolution: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text flex flex-row justify-center align-center">
                      Low Latency
                      <div
                        className="tooltip ml-2"
                        data-tip="How fast data moves across your computer and internet. Also known as ping."
                      >
                        <img
                          src="/info-circle.svg"
                          alt="info"
                          className="h-full w-6"
                        />
                      </div>
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          performance: {
                            ...data.performance,
                            lowLatency: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text flex flex-row justify-center align-center">
                      High Refresh Rate
                      <div
                        className="tooltip ml-2"
                        data-tip="Refresh rate defines how many times the monitor redraws the screen per second. Higher refresh rates mean smoother gameplay. Commonly seen as 60hz or 144hz"
                      >
                        <img
                          src="/info-circle.svg"
                          alt="info"
                          className="h-full w-6"
                        />
                      </div>
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          performance: {
                            ...data.performance,
                            highRefreshRate: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text flex flex-row justify-center align-center">
                      Other
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                    />
                  </label>
                </div>
              </ul>
            </label>
            <div className="divider md:hidden" />
            <div className="divider divider-horizontal " />
            <label className="form-control grow">
              <div className="label">
                <span className="label-text font-bold text-xl mb-4">
                  Please describe any other performance requirements you have.
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered h-48  textarea-primary"
                placeholder="Write here"
                onChange={(e) => {
                  setData({
                    ...data,
                    otherPerformance: e.target.value,
                  });
                }}
              ></textarea>
            </label>
          </div>
          <div className="divider" />
          <div className="form-row  justify-between">
            {/* Aesthetic preferences */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl  mb-4">
                  What aesthetic preferences do you have?
                </span>
              </div>
              <ul className="flex flex-col ">
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Minimalistic</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          aesthetic: {
                            ...data.aesthetic,
                            minimalistic: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">RGB</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          aesthetic: {
                            ...data.aesthetic,
                            rgb: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Colorful</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          aesthetic: {
                            ...data.aesthetic,
                            colorful: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Other</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        setData({
                          ...data,
                          aesthetic: {
                            ...data.aesthetic,
                            other: e.target.checked,
                          },
                        });
                      }}
                    />
                  </label>
                </div>
              </ul>
            </label>
            <div className="divider md:hidden" />
            <div className="divider divider-horizontal" />
            <label className="form-control grow">
              <div className="label">
                <span className="label-text font-bold text-xl  mb-4">
                  Please describe any other aesthetic preferences you have.
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered h-48 textarea-primary"
                placeholder="Write here"
                onChange={(e) => {
                  setData({
                    ...data,
                    otherAesthetic: e.target.value,
                  });
                }}
              ></textarea>
            </label>
          </div>
          <div className="divider" />
          {/* Other preferences textbox */}
          <div className="form-row">
            <label className="form-control grow">
              <div className="label">
                <span className="label-text font-bold text-xl mb-4">
                  Any other preferences you have?
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered h-48 textarea-primary"
                placeholder="Write here"
                onChange={(e) => {
                  setData({
                    ...data,
                    other: e.target.value,
                  });
                }}
              ></textarea>
            </label>
          </div>
          <div className="divider" />
          {/* Submit button */}
          <div className="form-row justify-center">
            <button
              className="btn btn-secondary text-base-100 "
              onClick={(e) => {
                e.preventDefault();
                if (verifyInput()) {
                  toggleShowModal(true);
                }
              }}
            >
              Submit
            </button>
          </div>
        </form>

        <dialog id="confirm_submit_modal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h1 className="text-xl md:text-3xl font-bold text-center">
              Confirm Submission
            </h1>
            <h2 className="hidden md:flex md:text-xl font-bold text-center">
              Please review your submission before confirming.
            </h2>
            <div className="divider" />
            <div className="form-row flex flex-row justify-between pb-6">
              <div className="form-control w-full md:max-w-xs">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <p className="border border-primary rounded-xl p-3 w-full max-w-xs">
                  {data.email}
                </p>
              </div>
              <div className="form-control w-full md:max-w-xs">
                <div className="label">
                  <span className="label-text">Budget</span>
                </div>
                <input
                  value={`$ ${data.minBudget} - $ ${data.maxBudget}`}
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
            </div>
            <div className="divider" />
            <div className="form-row  w-full">
              <div className="form-control w-full md:max-w-xs">
                <div className="label">
                  <span className="label-text font-bold text-lg md:text-xl">
                    This PC will be used for:
                  </span>
                </div>
                <ul className="flex flex-col ">
                  {Object.entries(data.usage).map(([key, value]) => {
                    return value ? (
                      <li key={key}>
                        <span className="label-text">
                          - {camelCaseToTitleCase(key)}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
              <div className="divider md:divider-horizontal" />

              <div
                className={`form-control grow w-full md:w-auto  ${
                  data.otherUsage ? "" : "hidden"
                }`}
              >
                <div className="label px-0">
                  <span className="label-text font-bold text-lg md:text-xl">
                    Other activities it will be used for:
                  </span>
                </div>
                <p className="border border-accent p-2 rounded-xl min-h-24">
                  {data.otherUsage}
                </p>
              </div>
            </div>
            <div className="divider" />
            <div className="form-row  justify-between">
              <div className="form-control w-full md:max-w-xs">
                <div className="label ">
                  <span className="label-text font-bold text-lg md:text-xl">
                    Performance Specifications:
                  </span>
                </div>
                <ul className="flex flex-col ">
                  {Object.entries(data.performance).map(([key, value]) => {
                    return value ? (
                      <li key={key}>
                        <span className="label-text">
                          - {camelCaseToTitleCase(key)}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
              <div className="divider md:divider-horizontal" />
              <div
                className={`form-control grow w-full md:w-auto ${
                  data.otherPerformance ? "" : "hidden"
                }`}
              >
                <div className="label px-0">
                  <span className="label-text font-bold text-lg md:text-xl">
                    Other performance requirements:
                  </span>
                </div>
                <p className="border border-accent p-2 rounded-xl min-h-24">
                  {data.otherPerformance}
                </p>
              </div>
            </div>
            <div className="divider" />
            <div className="form-row  justify-between">
              <div className="form-control w-full md:max-w-xs">
                <div className="label p-0">
                  <span className="label-text font-bold text-lg md:text-xl">
                    Aesthetic Preferences:
                  </span>
                </div>
                <ul className="flex flex-col ">
                  {Object.entries(data.aesthetic).map(([key, value]) => {
                    return value ? (
                      <li key={key}>
                        <span className="label-text">
                          - {camelCaseToTitleCase(key)}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
              <div className="divider md:divider-horizontal" />
              <div
                className={`form-control grow w-full md:w-auto ${
                  data.otherAesthetic ? "" : "hidden"
                }`}
              >
                <div className="label px-0">
                  <span className="label-text font-bold text-lg md:text-xl">
                    Other aesthetic preferences:
                  </span>
                </div>
                <p className="border border-accent p-2 rounded-xl min-h-24">
                  {data.otherAesthetic}
                </p>
              </div>
            </div>

            <div className="divider" />
            <div className="form-row">
              <div
                className={`form-control w-full md:w-auto md:grow ${
                  data.other ? "" : "hidden"
                }`}
              >
                <div className="label">
                  <span className="label-text font-bold text-lg md:text-xl">
                    Other preferences:
                  </span>
                </div>
                <p className="border border-accent p-2 rounded-xl min-h-24">
                  {data.other}
                </p>
              </div>
            </div>
            <div className={`divider ${data.other ? "" : "hidden"}`} />
            {/* Agree to terms */}
            <div className="form-row">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent mr-2"
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <span className="label-text font-bold">
                    I agree to be contacted by Blazing Builds for further
                    details at my email address.
                  </span>
                </label>
              </div>
            </div>
            {!loading ? (
              <div className="modal-action">
                <button
                  className="btn btn-secondary"
                  disabled={!acceptedTerms}
                  onClick={async (e) => {
                    const entry: Prisma.QuestionnaireEntryCreateInput = {
                      email: data.email,
                      minBudget: data.minBudget,
                      maxBudget: data.maxBudget,
                      usage: keysOfTrueBooleans(data.usage),
                      usageDetails: data.otherUsage,
                      performance: keysOfTrueBooleans(data.performance),
                      performanceDetails: data.otherPerformance,
                      aesthetics: keysOfTrueBooleans(data.aesthetic),
                      aestheticsDetails: data.otherAesthetic,
                      other: data.other,
                    };
                    setLoading(true);
                    try {
                      const ok = await createQuestionnaireEntry(entry);
                      const emailOk = await sendQuestionnaireEmail(ok);
                      if (emailOk) {
                        window.location.href = `/status?code=${ok.id}`;
                      } else {
                        alert("An error occurred. Please try again later.");
                        setLoading(false);
                      }
                    } catch (error) {
                      console.error(error);
                      alert("An error occurred. Please try again later.");
                      setLoading(false);
                    }
                  }}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="modal-action">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </div>
        </dialog>
      </div>
    </main>
  );
}

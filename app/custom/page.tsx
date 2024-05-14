"use client";
import { useState, useEffect } from "react";
import { mapValueToBudget } from "@/utils";
export default function Home() {
  const [minBudget, setMinBudget] = useState<number>(40);
  const [maxBudget, setMaxBudget] = useState<number>(60);

  const handleMinBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (value > maxBudget) {
      setMaxBudget(value);
    }
    setMinBudget(parseInt(event.target.value));
  };

  const handleMaxBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (value < minBudget) {
      setMinBudget(value);
    }
    setMaxBudget(parseInt(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    if (!email) {
      alert("Please enter an email");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.toString())) {
      alert("Please enter a valid email");
      return;
    }
    window.location.href = `/custom/questionnaire?minBudget=${minBudget}&maxBudget=${maxBudget}&email=${email}`;
  };
  return (
    <main>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://st4.depositphotos.com/2572561/29899/i/450/depositphotos_298993810-stock-photo-happy-gamer-in-headset-with.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero bg-base-200 p-10">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Make the perfect build!</h1>
              <p className="py-6">
                Once you complete the form, we will begin creating a PC build
                catered to your specific needs. We will contact you with a quote
                within 24 hours.
              </p>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Budget Min: ${mapValueToBudget(minBudget)}
                      {minBudget === 100 ? "+" : ""}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    value={minBudget}
                    onChange={handleMinBudgetChange}
                    max="100"
                    className="range range-info"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Budget Max: ${mapValueToBudget(maxBudget)}
                      {maxBudget === 100 ? "+" : ""}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    value={maxBudget}
                    onChange={handleMaxBudgetChange}
                    max="100"
                    className="range range-info"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-info"
                    name="email"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Get Started
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

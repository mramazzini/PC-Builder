"use client";

import { validateEmail, validateSecureString } from "@/src/lib/utils";

const { useState } = require("react");
export const signup = (email: string, password: string) => {
  const [error, setError] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    if (!email) {
      setError("Please enter an email");
      return;
    }
    if (validateEmail(email.toString()) === false) {
      setError("Please enter a valid email");
      return;
    }
    const password = formData.get("password") || "";
    const confirmPassword = formData.get("confirmPassword") || "";
    const res = validateSecureString(
      password.toString(),
      confirmPassword.toString()
    );
    if (res) {
      setError(res);
      return;
    }
    setError("");
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
              <h1 className="text-5xl font-bold">Create an Account!</h1>
              <div className="divider"></div>
              <p className="py-6">
                Keep track of all your orders and get exclusive discounts by
                creating an account.
              </p>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSubmit}>
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

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-info"
                    name="password"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input input-info"
                    name="confirmPassword"
                    required
                  />
                </div>
                <div className="divider"></div>
                {error && <div className="text-red-500">{error}</div>}
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
};

export default signup;

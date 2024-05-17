"use client";
import { useState } from "react";
import { login } from "../lib/actions/db/auth/login.actions";

const LoginForm = () => {
  const [error, setError] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      await login({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
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

      <div className="divider"></div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit">
          Get Started
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

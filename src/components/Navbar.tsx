"use client";
import { useState, useEffect } from "react";
import { destroySession, verifyToken } from "../lib/auth";
import Link from "next/link";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  }, [alert]);
  useEffect(() => {
    const checkToken = async () => {
      const isAuthenticated = await verifyToken();
      setLoggedIn(isAuthenticated);
    };
    checkToken();
  }, []);
  const handleClick = () => {
    setAlert(true);
  };
  const handleLogout = async () => {
    await destroySession();
    setLoggedIn(false);
    //reload page so protected routes redirect
    window.location.reload();
  };
  return (
    <div className="navbar bg-base-100 fixed z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={handleClick}>
              <a>Our PC&apos;s</a>
            </li>
            <li>
              <a href="/custom">Build your own</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl py-1" href="/">
          {/*Logo svg*/}
          <img src="/logo-no-background.svg" alt="Logo" className="h-full" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li onClick={handleClick}>
            <a>Our PC&apos;s</a>
          </li>
          <li>
            <a href="/custom">Build your own</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {loggedIn ? (
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <details>
                  <summary>Account</summary>
                  <ul className="p-2 bg-base-100 rounded-t-none">
                    <li>
                      <Link href="/account">Profile</Link>
                    </li>
                    <li>
                      <Link href="/orders">Order History</Link>
                    </li>
                    <li>
                      <Link href="/contact">Support</Link>
                    </li>
                    <li>
                      <div onClick={() => handleLogout()}>Logout</div>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        ) : (
          <a className="btn" href="/login">
            Login - Signup
          </a>
        )}
      </div>

      <div
        role="alert"
        className={`top-20 left-0 absolute alert alert-info fade-in transition transition-all ease-in-out duration-1000 ${
          alert ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Stay Tuned - We&apos;re working on this right now! </span>
      </div>
    </div>
  );
}

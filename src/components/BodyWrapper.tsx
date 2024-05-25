"use client";
import React, { useEffect } from "react";

type BodyWrapperProps = Readonly<{
  children: React.ReactNode;
  skip?: boolean;
}>;

export default function BodyWrapper({
  children,
  skip = false,
}: BodyWrapperProps) {
  useEffect(() => {
    if (skip) {
      window.scrollTo({
        top: 35,
        behavior: "smooth",
      });
    }
  }, [skip]);

  return (
    <div className="body-wrapper">
      <div className="navbar " />
      {children}
    </div>
  );
}

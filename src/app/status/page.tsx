"use client";
import { Suspense } from "react";
import StatusBody from "@/src/components/StatusBody";
export default function Status() {
  return (
    <main>
      <div
        className="min-h-screen  hero"
        style={{
          backgroundImage:
            "url(https://st4.depositphotos.com/2572561/29899/i/450/depositphotos_298993810-stock-photo-happy-gamer-in-headset-with.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-md">
            <Suspense fallback={<div>Loading...</div>}>
              <StatusBody />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

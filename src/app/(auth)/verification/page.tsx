import VerificationBody from "@/src/components/VerificationBody";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex justify-center ">
        <div className="text-center hero-content text-neutral-content ">
          <Suspense fallback={<div>Loading...</div>}>
            <VerificationBody />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

"use client";

import BodyWrapper from "@/src/components/BodyWrapper";
import ItemBody from "@/src/components/ItemBody";
export default function Home() {
  return (
    <BodyWrapper>
      <div className="p-5 min-h-screen bg-base-200">
        <ItemBody />
      </div>
    </BodyWrapper>
  );
}

import BodyWrapper from "@/src/components/BodyWrapper";
import SignupForm from "@/src/components/SignupForm";
import Link from "next/link";
export default function Home() {
  return (
    <BodyWrapper skip>
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
                <h1 className="text-5xl font-bold mb-2">Create an Account!</h1>
                <Link href="/login">
                  <h3 className="text-accent hover:underline font-bold">
                    Or Login here
                  </h3>
                </Link>
                <div className="divider"></div>
                <p className="py-6">
                  Keep track of all your orders and get exclusive discounts by
                  creating an account.
                </p>
              </div>

              <div className="divider lg:divider-horizontal"></div>

              <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </BodyWrapper>
  );
}

export default function Home() {
  return (
    <main>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className="hero-content text-center ">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl md:text-5xl font-bold">
              Let us build your PC...
            </h1>
            <p className="mb-5 text-lg md:text-xl">
              We match you with the perfect PC components for your specific
              needs, and build it for you - all within your budget.
            </p>
            <a href="/custom" className="mr-2">
              <button className="btn btn-primary">Get A Quote</button>
            </a>
            <a href="/prebuilt" className="ml-2">
              <button className="btn btn-accent">Top Seller&apos;s</button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

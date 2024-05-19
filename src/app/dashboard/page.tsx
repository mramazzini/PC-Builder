// TODO: Create a dashboard page
// Needs:
// - Create Order Form
// - Order History (including questionaires)
// - Order Status
// - PC questionaire link

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content p-10">
          <h1 className="text-5xl font-bold mb-2">Dashboard</h1>
          <div className="divider"></div>
          <div className="flex-col lg:flex-row">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
              <h2 className="text-3xl font-bold text-center">
                Create an Order
              </h2>
              <div className="divider"></div>
              <p className="p-4">
                Click the button below to start the order process.
              </p>
              <button className="btn btn-primary">Create Order</button>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
              <h2 className="text-3xl font-bold text-center">Order History</h2>
              <div className="divider"></div>
              <p className="p-4">
                View all of your past orders and their current status.
              </p>
              <button className="btn btn-primary">View Orders</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

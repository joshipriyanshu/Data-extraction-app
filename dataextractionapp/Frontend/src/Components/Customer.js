import { useSelector } from "react-redux";

const Customers = () => {
  const customers = useSelector((state) => state.customer.data);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Customer</h2>
      {customers.length === 0 ? (
        <p className="text-gray-500">No customer info</p>
      ) : (
        customers.map((c, idx) => (
          <div key={idx} className="bg-green-50 p-4 mb-3 rounded-lg shadow">
            <p><strong>Name:</strong> {c.name}</p>
            <p><strong>Phone:</strong> {c.phone}</p>
            <p><strong>Email:</strong> {c.email || "N/A"}</p>
            <p><strong>Address:</strong> {c.address}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Customers;

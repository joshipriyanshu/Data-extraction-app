import { useSelector } from "react-redux";

const Productinfopage = () => {
  const products = useSelector((state) => state.product?.data || []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">ID</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{p.description}</td>
                <td className="px-4 py-2">{p.quantity}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{p._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Productinfopage;

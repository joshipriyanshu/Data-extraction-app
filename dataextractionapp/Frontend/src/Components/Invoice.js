import { useSelector } from "react-redux";

const SetInvoices = () => {
  const invoices = useSelector((state) => state.invoice.data);

  return (
    <div>
      <h2>Invoice</h2>
      {invoices.map((inv, idx) => (
        <div key={idx}>
          <p><strong>Invoice #:</strong> {inv.invoiceNumber}</p>
          <p><strong>Date:</strong> {inv.invoiceDate}</p>
          <p><strong>Place:</strong> {inv.placeOfSupply}</p>
          <p><strong>City:</strong> {inv.city}</p>
        </div>
      ))}
    </div>
  );
}

export default SetInvoices;
  
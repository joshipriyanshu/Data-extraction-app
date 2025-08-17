import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCustomers } from "../redux/slice/customerSlice";
import { setInvoices } from "../redux/slice/invoiceslice";
import { setProducts } from "../redux/slice/productslice";

const Uploadsection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/test-upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const extracted = response.data.data;

      dispatch(setCustomers(extracted.customer ? [extracted.customer] : []));
      dispatch(
        setInvoices([
          {
            invoiceNumber: extracted.invoiceNumber,
            invoiceDate: extracted.invoiceDate,
            placeOfSupply: extracted.placeOfSupply,
            city: extracted.city,
            totals: extracted.totals,
            tax: extracted.tax,
            bankDetails: extracted.bankDetails,
            seller: extracted.seller,
            notes: extracted.notes,
            terms: extracted.terms,
          },
        ])
      );
      dispatch(setProducts(extracted.items || []));
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8">
          <span className="text-indigo-600">Invoice</span> Information Extractor
        </h1>

        <div className="p-6 border-2 border-dashed border-indigo-300 rounded-xl bg-indigo-50 text-center hover:bg-indigo-100 transition">
          <label
            htmlFor="file-upload"
            className="cursor-pointer block text-lg font-semibold text-indigo-700"
          >
            Upload Invoice (PDF only)
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleChange}
            accept=".pdf"
            className="hidden"
          />

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-sm text-gray-600">
              {selectedFile ? (
                <>
                  Selected:{" "}
                  <span className="font-medium text-indigo-700">
                    {selectedFile.name}
                  </span>
                </>
              ) : (
                "No file chosen"
              )}
            </span>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-700 transition transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Extracting..." : "Extract Info"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploadsection;

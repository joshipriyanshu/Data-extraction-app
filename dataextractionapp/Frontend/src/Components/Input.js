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
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://data-extraction-app.onrender.com/test-upload",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800">
          <span className="text-indigo-600">Invoice</span> Information Extractor
        </h1>

        {/* File Upload Section */}
        <div className="p-8 border-2 border-dashed border-indigo-300 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition text-center space-y-4">
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="hidden"
          />

          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block bg-blue-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            Choose Invoice (PDF)
          </label>

          {selectedFile && (
            <p className="text-sm text-gray-700">
              Selected:{" "}
              <span className="font-medium text-indigo-700">
                {selectedFile.name}
              </span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-indigo-700 transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Extract Info"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Uploadsection;

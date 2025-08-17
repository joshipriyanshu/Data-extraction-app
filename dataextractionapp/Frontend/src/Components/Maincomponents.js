import React, { useState } from 'react'; // useEffect is not used in the App component, so it can be removed
import axios from 'axios';

// ---
// Main App Component
// ---
const Alternateapp = () => { // Correctly defined as a functional component
  const handleFileChange = (file) => {
    if (file) {
      console.log('File selected:', file.name, file);
      
    } else {
      console.log('No file selected or file cleared.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Upload Your File
        </h1>
        {/* Render the FileInput component */}
        <FileInput onFileChange={handleFileChange} />
      </div>
    </div>
  );
};

// ---
// FileInput Component
// ---
// FileInput component for handling file selection and upload
const FileInput = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false); // State for upload in progress
  const [uploadMessage, setUploadMessage] = useState(''); // State for upload feedback
  const [uploadError, setUploadError] = useState(''); // State for upload errors

  // Backend endpoint URL
  const backendUrl = 'http://localhost:3000/test-upload'; // Ensure this matches your backend route

  // Handles the change event when a file is selected
  const handleInputChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the selection
    setSelectedFile(file);
    setUploadMessage(''); // Clear previous messages
    setUploadError('');    // Clear previous errors
    if (onFileChange) {
      onFileChange(file); // Pass the file to the parent component's handler
    }
  };

  // Handles clearing the selected file
  const handleClearFile = () => {
    setSelectedFile(null);
    setUploadMessage('');
    setUploadError('');
    // Reset the input element's value to allow selecting the same file again
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.value = '';
    }
    if (onFileChange) {
      onFileChange(null); // Notify parent that file is cleared
    }
  };

  // Handles the file upload to the backend
  const handleSubmit = async () => { // Renamed from handleUpload to handleSubmit for clarity
    if (!selectedFile) {
      setUploadError('Please select a file first.');
      return;
    }

    setUploading(true);
    setUploadMessage('');
    setUploadError('');

    const formData = new FormData();
    formData.append('file', selectedFile); // 'file' is the field name your backend expects

    try {
      const response = await axios.post(backendUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      setUploadMessage(`File uploaded successfully! Response: ${JSON.stringify(response.data)}`);
      console.log('Upload successful:', response.data);
      handleClearFile(); // Clear the file input after successful upload
    } catch (error) {
      console.error('Error submitting file:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setUploadError(`Upload failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response was received
        setUploadError('Upload failed: No response from server. Is the backend running?');
      } else {
        // Something happened in setting up the request that triggered an Error
        setUploadError(`Upload failed: ${error.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* File input area */}
      <label
        htmlFor="file-upload"
        className="relative cursor-pointer bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-blue-700 transition-colors duration-200"
      >
        <svg
          className="w-10 h-10 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a3 3 0 013 3v10a2 2 0 01-2 2H7a2 2 0 01-2-2v-1a1 1 0 011-1h1zm0 0l-3-3m3 3l3-3"
          ></path>
        </svg>
        <span className="font-semibold text-lg">
          {selectedFile ? selectedFile.name : 'Choose a file or drag it here'}
        </span>
        <span className="text-sm text-gray-500">
          (e.g., PDF, Excel, Image)
        </span>
        <input
          id="file-upload"
          type="file"
          name="files"
          className="sr-only" // Hide the default input visually
          onChange={handleInputChange}
          // enctype="multipart/form-data" // This attribute is for the <form> tag, not <input>
        />
      </label>

      {/* Display selected file name and action buttons */}
      {selectedFile && (
        <div className="flex flex-col items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200 space-y-3">
          <span className="text-gray-700 text-sm truncate pr-2 w-full text-center">
            Selected: {selectedFile.name}
          </span>
          <div className="flex justify-center w-full space-x-2"> {/* Button group for layout */}
            <button
              onClick={handleSubmit}
              className={`
                px-4 py-2 rounded-md font-semibold text-white
                transition-colors duration-200
                ${uploading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              `}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Submit the file'}
            </button>
            <button
              onClick={handleClearFile}
              className={`
                px-4 py-2 rounded-md font-semibold text-white
                transition-colors duration-200
                ${uploading ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
              `}
              disabled={uploading}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Upload feedback messages */}
      {uploadMessage && <p className="text-green-600 text-sm text-center mt-2">{uploadMessage}</p>}
      {uploadError && <p className="text-red-600 text-sm text-center mt-2">{uploadError}</p>}
    </div>
  );
};

export default Alternateapp; // Export the main App component

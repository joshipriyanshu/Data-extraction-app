
import React, { useEffect, useState } from 'react';
import axios from 'axios';





// Main App component to demonstrate FileInput
const App = () => { 

  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file

  const [data, setData] = useState(null); // State to hold the response data from the backend
   // Initialize with null or empty file

  const [allUsers, setAllUsers] = useState([])



  // Fetch users from the backend on component mount
    useEffect  (  () =>  {
      const  fetchUsers = async () => {
      try {
      const response = await axios.get('http://localhost:3000/users')
          .then(response => {
            console.log('Users fetched successfully:', response.data);
            setAllUsers(response.data); // Set the fetched users to state
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      } catch (error) {
        console.error('Error during initial fetch:', error);
      } }

      fetchUsers(); // Call the function to fetch users   
      ; // Reset data state on component mount
    }, []); // Empty dependency array means this runs once on mount







  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]); // Update state with the selected file
  }
  
  const handlesubmit = async () => {

    const formData = new FormData();

  formData.append('files', selectedFile);


    try { 

      // const response  = await axios.get('http://localhost:3000/')

      
      const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
          'Content-Type': 'multipart/form-data', // Explicitly set Content-Type
        }, })   
        const responseData = response.data; // Get the response data from the backend
      console.log('Response from backend:', responseData);

     
      // Update state with the response message
      console.log('Backend response:', response.data);
      
      setData( {
        name: responseData.name,
      email: responseData.email,
        mobile: responseData.mobile,
      workExperience: responseData.workExperience,
      address:  responseData.address} || 'File uploaded successfully!');
    }
    
    catch (error) { 
      console.error('Error during file upload:', error);
    }}
   
  
  return (
      <>
      
      <style>
      {`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }
      `}
    </style>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8 font-inter antialiased flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-3xl border border-gray-50">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight leading-tight">
          <span className="text-blue-700">Resume</span> Information Extractor
        </h1>

        {/* File Upload Section */}
        <div className="mb-10 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-inner-lg">
          <label htmlFor="file-upload" className="block text-xl font-semibold text-blue-800 mb-4">
            Upload Your Resume (PDF only):
          </label>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input 
              id="file-upload"
              name="files" 
              type="file" 
              onChange={handleChange} 
              className="block w-full text-base text-gray-700
                file:mr-4 file:py-3 file:px-7
                file:rounded-full file:border-0
                file:text-base file:font-semibold
                file:bg-blue-200 file:text-blue-800
                hover:file:bg-blue-300 transition duration-300 ease-in-out cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              accept=".pdf" // Restrict to PDF files
            />
            <button 
              className="w-full sm:w-auto bg-blue-800 text-white px-9 py-3 rounded-full shadow-xl 
                         hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105 
                         focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75" 
              onClick={handlesubmit}
            >
              Extract Info
            </button>
          </div>
          {selectedFile && (
            <p className="text-sm text-gray-600 mt-3 text-center sm:text-left">
              Selected file: <span className="font-medium text-blue-800">{selectedFile.name}</span>
            </p>
          )}
        </div>

        {/* Display Extracted Data */}
        {data && ( // Conditionally render the data if 'data' is not null
          <div className="mt-8 p-7 bg-green-50 border border-green-300 rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-green-800 mb-5 text-center">Extracted Information:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-gray-800 text-lg">
              <p><strong className="text-green-700">Name:</strong> {data.name}</p>
              <p><strong className="text-green-700">Email:</strong> {data.email}</p>
              <p><strong className="text-green-700">Mobile:</strong> {data.mobile}</p>
              <p><strong className="text-green-700">Address:</strong> {data.address}</p>
              <div className="md:col-span-2">
                <p><strong className="text-green-700">Work Experience/Profile:</strong> {data.workExperience}</p>
              </div>
            </div>
          </div> 
        )}
        
        <hr className="my-14 border-t-2 border-gray-200" /> 

        {/* Display All Stored Users (Mock Data) */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          All Stored Users <span className="text-purple-700">(Mock Data)</span>:
        </h2>
        
        {allUsers.length === 0 && <p className="text-gray-600 text-center py-4">No users found in the database.</p>}
        {allUsers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {allUsers.map((userItem) => (
              <div key={userItem._id} className="p-6 bg-purple-50 border border-purple-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                <p className="text-xl font-semibold text-purple-800 mb-2">{userItem.name}</p>
                <ul className="text-gray-700 space-y-1.5 text-base">
                  <li><strong className="text-purple-700">Email:</strong> {userItem.email}</li>
                  <li><strong className="text-purple-700">Mobile:</strong> {userItem.mobile}</li>
                  <li><strong className="text-purple-700">Work Experience:</strong> {userItem.workExperience}</li>
                  {userItem.address && <li><strong className="text-purple-700">Address:</strong> {userItem.address}</li>}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
      
      
      
      </>

  )
  
  
  
  
  
  
  
  
  
  
  
  
  };
  
  
  // Renamed from Fileselector to App for Canvas default export
//   const handleFileChange = (file) => {
//     if (file) {
//       console.log('File selected:', file.name, file);
//       // You can lift this file state up to a parent component if needed
//     } else {
//       console.log('No file selected or file cleared.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Upload Your File
//         </h1>
//         {/* Render the FileInput component */}
//         <FileInput onFileChange={handleFileChange} />
//       </div>
//     </div>
//   );
// };

// // FileInput component for handling file selection and upload
// const FileInput = ({ onFileChange }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false); // State for upload in progress
//   const [uploadMessage, setUploadMessage] = useState(''); // State for upload feedback
//   const [uploadError, setUploadError] = useState(''); // State for upload errors

//   // Backend endpoint URL
//   const backendUrl = 'http://localhost:3000/upload'; // Ensure this matches your backend route

//   // Handles the change event when a file is selected
//   const handleInputChange = (event) => {
//     const file = event.target.files[0]; // Get the first file from the selection
//     setSelectedFile(file);
//     setUploadMessage(''); // Clear previous messages
//     setUploadError('');   // Clear previous errors
//     if (onFileChange) {
//       onFileChange(file); // Pass the file to the parent component's handler
//     }
//   };

//   // Handles clearing the selected file
//   const handleClearFile = () => {
//     setSelectedFile(null);
//     setUploadMessage('');
//     setUploadError('');
//     // Reset the input element's value to allow selecting the same file again
//     const fileInput = document.getElementById('file-upload');
//     if (fileInput) {
//       fileInput.value = '';
//     }
//     if (onFileChange) {
//       onFileChange(null); // Notify parent that file is cleared
//     }
//   };

//   // Handles the file upload to the backend
//   const handleSubmit = async () => { // Renamed from handleUpload to handleSubmit for clarity
//     if (!selectedFile) {
//       setUploadError('Please select a file first.');
//       return;
//     }

//     setUploading(true);
//     setUploadMessage('');
//     setUploadError('');

//     const formData = new FormData();
//     formData.append('file', selectedFile); // 'file' is the field name your backend expects

//     try {
//       const response = await axios.post(backendUrl, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Important for file uploads
//         },
//       });
//       setUploadMessage(`File uploaded successfully! Response: ${JSON.stringify(response.data)}`);
//       console.log('Upload successful:', response.data);
//       handleClearFile(); // Clear the file input after successful upload
//     } catch (error) {
//       console.error('Error submitting file:', error);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         setUploadError(`Upload failed: ${error.response.data.message || error.response.statusText}`);
//       } else if (error.request) {
//         // The request was made but no response was received
//         setUploadError('Upload failed: No response from server. Is the backend running?');
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setUploadError(`Upload failed: ${error.message}`);
//       }
//     } finally {
//       setUploading(false);
//     }
//   };

//   // The return statement for the FileInput component was misplaced. It's now correctly here.
//   return (
//     <div className="space-y-4">
//       {/* File input area */}
//       <label
//         htmlFor="file-upload"
//         className="relative cursor-pointer bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-blue-700 transition-colors duration-200"
//       >
//         <svg
//           className="w-10 h-10 mb-2"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a3 3 0 013 3v10a2 2 0 01-2 2H7a2 2 0 01-2-2v-1a1 1 0 011-1h1zm0 0l-3-3m3 3l3-3"
//           ></path>
//         </svg>
//         <span className="font-semibold text-lg">
//           {selectedFile ? selectedFile.name : 'Choose a file or drag it here'}
//         </span>
//         <span className="text-sm text-gray-500">
//           (e.g., PDF, Excel, Image)
//         </span>
//         <input
//           id="file-upload"
//           type="file"
//           name="files"
//           className="sr-only" // Hide the default input visually
//           onChange={handleInputChange}
//           enctype="multipart/form-data"
//         />
//       </label>

//       {/* Display selected file name and action buttons */}
//       {selectedFile && (
//         <div className="flex flex-col items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200 space-y-3">
//           <span className="text-gray-700 text-sm truncate pr-2 w-full text-center">
//             Selected: {selectedFile.name}
//           </span>
//           <div className="flex justify-center w-full space-x-2"> {/* Button group for layout */}
//             <button
//               onClick={handleSubmit}
//               className={`
//                 px-4 py-2 rounded-md font-semibold text-white
//                 transition-colors duration-200
//                 ${uploading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
//               `}
//               disabled={uploading}
//             >
//               {uploading ? 'Uploading...' : 'Submit the file'}
//             </button>
//             <button
//               onClick={handleClearFile}
//               className={`
//                 px-4 py-2 rounded-md font-semibold text-white
//                 transition-colors duration-200
//                 ${uploading ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
//               `}
//               disabled={uploading}
//             >
//               Clear
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Upload feedback messages */}
//       {uploadMessage && <p className="text-green-600 text-sm text-center mt-2">{uploadMessage}</p>}
//       {uploadError && <p className="text-red-600 text-sm text-center mt-2">{uploadError}</p>}
//     </div>
//   );


export default App; // Exporting App as default for Canvas

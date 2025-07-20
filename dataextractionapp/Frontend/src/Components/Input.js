
import React, { useEffect, useState } from 'react';
import axios from 'axios';





// Main App component to demonstrate FileInput
const Uploadsection = () => { 

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
          <span className="text-blue-500">Resume</span> Information Extractor
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
              className="w-full sm:w-auto bg-blue-500 text-white px-9 py-3 rounded-full shadow-xl 
                         hover:bg-sky-600 text-black transition duration-300 ease-in-out transform hover:scale-110 
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
          All Stored Users <span className="text-purple-5 00">(Data from database)</span>:
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
  
  


export default Uploadsection; 

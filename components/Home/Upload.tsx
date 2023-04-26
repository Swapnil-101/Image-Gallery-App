import React, { useState } from "react";
import Form from "./Form";

const Upload = ({results,setResults}:any) => {
  // State to manage model visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle model visibility
  const toggleModel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleModel}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      {isOpen && (
        // <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
        //   <div className="bg-white p-8 rounded shadow-md max-w-sm">
        //     <h2 className="text-2xl font-bold mb-4">Model Content</h2>
        //     <p className="text-gray-600">This is the content of the model.</p>
        //     <button
        //       onClick={toggleModel}
        //       className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded"
        //     >
        //       Close
        //     </button>
        //   </div>
        // </div>
        <div>
            <Form  results={results} setResults={setResults} toggleModel={toggleModel}/>
        </div>
      )}
    </div>
  );
};

export default Upload;

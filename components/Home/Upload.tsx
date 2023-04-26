import React, { useState } from "react";
import FormCompo from "./Form";

interface Upload {
  results: any;
  setResults: any;
  toggleModel: any;
}
const Upload: React.FC = (results, setResults) => {
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
        <div>
          <FormCompo
            results={results}
            setResults={setResults}
            toggleModel={toggleModel}
          />
        </div>
      )}
    </div>
  );
};

export default Upload;

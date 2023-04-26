import React from "react";

const Pagination = ({
  handleNextPage,
  handlePrevPage,
  totalPages,
  page,
  setPage,
}: any) => {
  return (
    <div>
      <div className="flex">
        <a
          onClick={handlePrevPage}
          className="px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-pointer dark:bg-gray-800 dark:text-gray-600"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </a>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`${
                pageNumber == page ? "bg-blue-500 text-white" : ""
              } hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200`}
              onClick={() => setPage(pageNumber)}
              disabled={pageNumber === page}
            >
              {pageNumber}
            </button>
          )
        )}

        <a
          onClick={handleNextPage}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform cursor-pointer bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Pagination;

import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      {/* Previous Button */}
      <li>
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className={`inline-flex w-8 h-8 items-center justify-center rounded border ${
            currentPage === 1 ? "border-gray-200 text-gray-400" : "border-gray-100 bg-white text-gray-900"
          }`}
        >
          <span className="sr-only">Previous Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <li key={index + 1}>
          <button
            onClick={() => handlePageClick(index + 1)}
            className={`block w-8 h-8 rounded border text-center leading-8 ${
              currentPage === index + 1
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-100 bg-white text-gray-900"
            }`}
          >
            {index + 1}
          </button>
        </li>
      ))}

      {/* Next Button */}
      <li>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className={`inline-flex w-8 h-8 items-center justify-center rounded border ${
            currentPage === totalPages ? "border-gray-200 text-gray-400" : "border-gray-100 bg-white text-gray-900"
          }`}
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ol>
  );
};

export default Pagination;

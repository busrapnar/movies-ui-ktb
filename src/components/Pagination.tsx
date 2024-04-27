import React from 'react';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, goToPage }) => {
  const fixedPageCount = 5; 
  let startPage = Math.max(0, currentPage - Math.floor(fixedPageCount / 2));
  let endPage = Math.min(totalPages - 1, startPage + fixedPageCount - 1);

  if (endPage - startPage + 1 < fixedPageCount) {
    startPage = Math.max(0, totalPages - fixedPageCount);
    endPage = totalPages - 1;
  } else if (endPage === totalPages - 1) {
    startPage = endPage - fixedPageCount + 1;
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i + 1);

  return (
    <div className="mt-4 flex justify-center">
      {startPage > 0 && (
        <button
          onClick={() => goToPage(1)}
          className={`mx-1 px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <MdNavigateBefore className="w-6 h-6"/>
        </button>
      )}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => goToPage(pageNumber)}
          className={`mx-1 px-4 py-2 w-12 h-12 rounded ${
            currentPage === pageNumber
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      {endPage < totalPages - 1 && (
        <button
          onClick={() => goToPage(totalPages)}
          className={`mx-1 px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <MdNavigateNext className="w-6 h-6"/>
        </button>
      )}
    </div>
  );
};

export default Pagination;

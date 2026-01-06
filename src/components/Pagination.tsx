import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { PaginationProps } from "../types";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaArrowLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page
              ? "bg-sky-500 text-white"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border cursor-pointer rounded disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;

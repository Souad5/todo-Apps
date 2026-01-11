import { TASKS_PER_PAGE } from "../constants/settings";
import type { PaginationProps } from "../types";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const half = Math.floor(TASKS_PER_PAGE / 2);

  let startPage = Math.max(1, currentPage - half);
  const endPage = Math.min(totalPages, startPage + TASKS_PER_PAGE - 1);

  if (endPage - startPage + 1 < TASKS_PER_PAGE) {
    startPage = Math.max(1, endPage - TASKS_PER_PAGE + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-center items-center gap-2 mt-6 select-none">
      {/* First */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        title="first page"
      >
        &laquo; &laquo;
      </button>

      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        title="prev"
      >
        &lt;
      </button>

      {/* Leading dots */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
          >
            1
          </button>
          <span className="px-2">…</span>
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded transition ${
            currentPage === page
              ? "bg-sky-500 text-white"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Trailing dots */}
      {endPage < totalPages && (
        <>
          <span className="px-2">…</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        title="next"
      >
        &gt;
      </button>

      {/* Last */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        title="last page"
      >
        &raquo; &raquo;
      </button>
    </div>
  );
};

export default Pagination;

'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 border rounded-md transition-colors ${
            currentPage === page
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};
import type { PaginationProps } from "../type/typeconentglobla";

export default function Pagination({
  page,
  limit,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-2 py-4 bg-white">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded-md border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
      >
        ‹
      </button>
      <span className="px-3 py-1 text-sm text-gray-600">
        Page <span className="font-semibold text-black">{page}</span> /{" "}
        {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-md border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
      >
        ›
      </button>
    </div>
  );
}

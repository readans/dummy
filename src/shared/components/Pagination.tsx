import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";

type Props = {
  total: number,
  page: number,
  limit: number,
  onPageChange: (page: number) => void
}

export default function Pagination({ total, page, limit, onPageChange }: Props) {
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    console.log("page: ", page - 1)
    onPageChange(page - 1);
  };

  const handleNext = () => {
    console.log("page: ", page + 1)
    onPageChange(page + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button className="size-10 grid place-items-center rounded-full text-gray-900 dark:text-neutral-400 border border-gray-200 dark:border-neutral-800 disabled:text-gray-900/50 dark:disabled:text-neutral-400/50 disabled:border-none cursor-pointer" onClick={handlePrev} disabled={!(page > 0)}>
        <ChevronLeftIcon />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => page !== (num - 1) && onPageChange(num - 1)}
          className={`size-10 grid place-items-center rounded-full border border-gray-200 dark:border-neutral-800 [&.active]:bg-gray-50 dark:[&.active]:bg-neutral-800/20 text-gray-900 dark:text-neutral-400 cursor-pointer ${page === (num - 1) && 'active'}`}
        >
          {num}
        </button>
      ))}

      <button className="size-10 grid place-items-center rounded-full text-gray-900 dark:text-neutral-400 border border-gray-200 dark:border-neutral-800 disabled:text-gray-900/50 dark:disabled:text-neutral-400/50 disabled:border-none cursor-pointer" onClick={handleNext} disabled={!((page + 1) < totalPages)}>
        <ChevronRightIcon />
      </button>
    </div>
  );
}

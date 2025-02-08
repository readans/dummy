export default function PostCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#161616] border border-gray-200 dark:border-neutral-800 rounded-xl animate-pulse">
      <div className="p-6 grid grid-cols-[40px_1fr_20px] gap-4 border-b border-gray-200 dark:border-neutral-800">
        <div className="size-10 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>

      <div className="p-6 space-y-6 border-b border-gray-200 dark:border-neutral-800">
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />

        <div className="aspect-[3/2] w-full bg-gray-300 dark:bg-gray-700 rounded-lg" />

        <div className="grid grid-cols-2">
          <div className="inline-flex items-center gap-4">
            <div className="size-5 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-8 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="justify-self-end h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>

      <div className="p-6">
        <div className="px-4 border-b border-gray-200 dark:border-[#262626] flex items-center gap-4">
          <div className="h-10 flex-1 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="size-6 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

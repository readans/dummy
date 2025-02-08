import { motion } from "framer-motion";

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-neutral-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#222222] dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3">Id</th>
            <th scope="col" className="px-6 py-3">Nombres y apellidos</th>
            <th scope="col" className="px-6 py-3">Foto</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, i) => (
            <tr key={i} className="bg-white border-b dark:bg-[#282828] dark:border-neutral-400 border-gray-200 hover:bg-gray-50 dark:hover:bg-[#222222] last:border-none">
              <td className="px-6 py-4">
                <motion.div
                  className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                />
              </td>
              <td className="px-6 py-4">
                <motion.div
                  className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                />
              </td>
              <td className="px-6 py-4">
                <motion.div
                  className="size-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-4">
                  {[...Array(3)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="size-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import CheckIcon from "./icons/CheckIcon";
import XIcon from "./icons/XIcon";
import ExclamationMarkIcon from "./icons/ExclamationMarkIcon";
import InfoCircleIcon from "./icons/InfoCircleIcon";
import { useToast } from "../hooks/useToast";

const icons = {
  success: <CheckIcon className="text-green-500" />,
  error: <XIcon className="text-red-500" />,
  warning: <ExclamationMarkIcon className="text-yellow-500" />,
  info: <InfoCircleIcon className="text-blue-500" />,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex items-center gap-4 px-4 py-3 bg-white dark:bg-gray-800 shadow-lg border-l-4"
            style={{
              borderColor:
                toast.type === "success"
                  ? "#10B981"
                  : toast.type === "error"
                    ? "#EF4444"
                    : toast.type === "warning"
                      ? "#F59E0B"
                      : "#3B82F6",
            }}
          >
            {icons[toast.type]}
            <div className="">
              <h6 className="font-semibold">{toast.type}</h6>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer self-start"
            >
              ✖
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

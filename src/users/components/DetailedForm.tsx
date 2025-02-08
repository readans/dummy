import XIcon from "../../shared/components/icons/XIcon"
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  title: string,
  form: Record<string, any>,
  onCancel: () => void
}

export default function DetailedForm({ title, form, onCancel }: Props) {
  return (
    <AnimatePresence>
      <div className="relative p-10 flex flex-col items-center gap-4 w-md min-w-0">
        <XIcon className="absolute top-0 right-0 dark:text-white mt-6 mr-6 cursor-pointer" onClick={() => onCancel()} />
        <div className="size-32 p-1 rounded-full bg-gray-200 dark:bg-neutral-800/20 grid place-items-center">
          <motion.img
            src={form.picture}
            transition={{ duration: 0.5 }}
            alt="Thumbnail"
            layoutId={`image-transition-${form.id}`}
            className="size-full rounded-full"
          />
        </div>
        <h4 className="text-2xl dark:text-white font-semibold text-center">{title}</h4>
        <div className="w-full space-y-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 dark:text-neutral-400" htmlFor="title">Title</label>
            <input className="px-4 py-2 outline-none dark:text-neutral-200 border border-neutral-400 dark:border-neutral-800 rounded-md disabled:bg-gray-100 dark:disabled:bg-neutral-800/20" value={form.title} type="text" disabled name="title" id="title" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 dark:text-neutral-400" htmlFor="firstName">First Name</label>
            <input className="px-4 py-2 outline-none dark:text-neutral-200 border border-neutral-400 dark:border-neutral-800 rounded-md disabled:bg-gray-100 dark:disabled:bg-neutral-800/20" value={form.firstName} type="text" name="firstName" disabled id="firstName" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 dark:text-neutral-400" htmlFor="lastName">Last Name</label>
            <input className="px-4 py-2 outline-none dark:text-neutral-200 border border-neutral-400 dark:border-neutral-800 rounded-md disabled:bg-gray-100 dark:disabled:bg-neutral-800/20" value={form.lastName} type="text" name="lastName" disabled id="lastName" />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-md hover:cursor-pointer hover:bg-[#f5f5f5]" onClick={() => onCancel()}>Regresar</button>
        </div>
      </div>
    </AnimatePresence>
  )
}

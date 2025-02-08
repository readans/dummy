import { ChangeEvent, ReactNode } from "react";
import XIcon from "../../shared/components/icons/XIcon";

export default function UserForm({
  title,
  icon,
  form,
  onChange,
  onConfirm,
  onCancel
}: {
  title: string,
  icon: ReactNode,
  form: Record<string, any>,
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  onConfirm: () => void,
  onCancel: () => void,
}) {

  return (
    <div className="relative p-10 flex flex-col items-center gap-4 w-md min-w-0">
      <XIcon className="absolute top-0 right-0 mt-6 mr-6 cursor-pointer dark:text-white" onClick={() => onCancel()} />
      <div className="size-12 rounded-full bg-gray-200 dark:bg-neutral-800/20 dark:text-white grid place-items-center">
        {icon}
      </div>
      <h4 className="text-2xl dark:text-white font-semibold text-center">{title}</h4>
      <div className="w-full space-y-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 dark:text-neutral-400" htmlFor="title">Title</label>
          <input className="px-4 py-2 outline-none dark:text-neutral-200 border border-neutral-400 dark:border-neutral-800 rounded-md disabled:bg-gray-100 w-full" value={form.title} onChange={onChange} type="text" name="title" id="title" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 dark:text-neutral-400" htmlFor="firstName">First Name</label>
          <input className="px-4 py-2 outline-none dark:text-neutral-200 border border-neutral-400 dark:border-neutral-800 rounded-md disabled:bg-gray-100" value={form.firstName} onChange={onChange} type="text" name="firstName" id="firstName" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 dark:text-neutral-400" htmlFor="lastName">Last Name</label>
          <input className="px-4 py-2 outline-none dark:text-neutral-200 border border-neutral-400 dark:border-neutral-800 rounded-md disabled:bg-gray-100" value={form.lastName} onChange={onChange} type="text" name="lastName" id="lastName" />
        </div>
        {!form.id && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 dark:text-neutral-400" htmlFor="email">Email</label>
            <input className="px-4 py-2 outline-none dark:text-neutral-200 border border-neutral-400 dark:border-neutral-800 rounded-md disabled:bg-gray-100" value={form.email} onChange={onChange} type="text" name="email" id="email" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="px-6 py-3 bg-white border border-gray-200 rounded-md hover:cursor-pointer hover:bg-[#f5f5f5]" onClick={() => onCancel()}>Cancelar</button>
        <button className="px-6 py-3 bg-[#262626] border border-neutral-800 text-white rounded-md hover:cursor-pointer hover:bg-[#222222]" onClick={() => onConfirm()}>Confirmar</button>
      </div>
    </div>
  )
}

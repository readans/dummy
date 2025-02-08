import AlertTriangleIcon from "./icons/AlertTriangleIcon";
import XIcon from "./icons/XIcon";
import Modal from "./Modal";

type Props = {
  isOpen: boolean,
  title: string,
  description: string,
  onConfirm: () => void,
  onCancel: () => void
}

export default function ConfirmModal({ isOpen, title, description, onConfirm, onCancel }: Props) {
  return (
    <Modal isOpen={isOpen}>
      <div className="relative p-10 flex flex-col items-center gap-4">
        <XIcon className="absolute top-0 right-0 mt-6 mr-6 dark:text-white cursor-pointer" onClick={() => onCancel()} />
        <div className="size-12 rounded-full bg-gray-200 grid place-items-center dark:bg-neutral-800/20">
          <AlertTriangleIcon className="dark:text-white" />
        </div>
        <h5 className="text-center dark:text-white font-semibold text-xl">{title}</h5>
        <p className="text-center text-neutral-400">{description}</p>
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-md hover:cursor-pointer hover:bg-[#f5f5f5]" onClick={() => onCancel()}>Cancelar</button>
          <button className="px-6 py-3 bg-[#262626] border border-neutral-800 text-white rounded-md hover:cursor-pointer hover:bg-[#222222]" onClick={() => onConfirm()}>Confirmar</button>
        </div>
      </div>
    </Modal>
  )
}

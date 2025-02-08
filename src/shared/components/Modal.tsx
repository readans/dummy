import { motion } from "framer-motion"
import React from "react"

type Props = {
  isOpen: boolean,
  children: React.ReactNode
}

export default function Modal({ isOpen, children }: Props) {

  if (!isOpen) return

  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-black/80"></div>
      <div className="fixed z-10 inset-0 flex justify-center items-center">
        <motion.div
          transition={{ duration: .5 }}
          initial={{ opacity: 0, translateY: '100px' }}
          animate={{ opacity: 1, translateY: 0 }}
          className="rounded-lg bg-white dark:bg-[#161616] border border-gray-200 dark:border-neutral-800 overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    </>
  )
}

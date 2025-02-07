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
        <div className="bg-white rounded-lg">
          {children}
        </div>
      </div>
    </>
  )
}

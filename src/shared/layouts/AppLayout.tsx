import React from "react"
import Navigation from "../components/Navigation"
import Sidebar from "../components/Sidebar"

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <>
      <Navigation></Navigation>
      <main>
        <Sidebar />
        <div className="ml-[300px] pb-6">
          {children}
        </div>
      </main>
    </>
  )
}

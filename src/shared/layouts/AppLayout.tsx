import React from "react"
import Navigation from "../components/Navigation"

type Props = {
  title: string,
  children: React.ReactNode
}

export default function AppLayout({ title, children }: Props) {
  return (
    <>
      <Navigation title={title}></Navigation>
      <div className="max-w-7xl min-w-0 mx-auto">
        {children}
      </div>
    </>
  )
}

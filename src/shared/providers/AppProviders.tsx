import React from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

type Props = {
  children: React.ReactNode
}

export default function AppProviders({ children }: Props) {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

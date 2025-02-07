import React from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";
import ToastContainer from "../components/ToastContainer";

type Props = {
  children: React.ReactNode
}

export default function AppProviders({ children }: Props) {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

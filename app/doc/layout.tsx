import LiveBlocksProvider from "@/components/LiveBlocksProvider"
import React from "react"

function Pagelayout({children} : {children: React.ReactNode}) {
  return (
    <LiveBlocksProvider>{children}</LiveBlocksProvider>
  )
}

export default Pagelayout
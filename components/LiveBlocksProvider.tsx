'use client'

import {LiveblocksProvider} from "@liveblocks/react/suspense";


function LiveBlocksProvider({children} : {
    children: React.ReactNode
}) {

    if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_KEY){
        throw new Error ("LiveBlocks public key is not set");

    }

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>

    {children}

    </LiveblocksProvider>
  )
}

export default LiveBlocksProvider
import React from 'react'
import Home from './home/page'
import { getServerSession } from 'next-auth'
import { authOptions } from "../lib/authOptions"


const HomePage = async () => {

    const session = await getServerSession(authOptions);
    console.log("sesss", session?.user)
   
    return(
        <>
            <Home />
        </>
    )
    
}

export default HomePage;

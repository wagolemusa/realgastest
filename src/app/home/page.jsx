'use client'
import React from "react";

import Cardslide from "../../components/gas/Cardslide";
import Cylinder12kgs from "../../components/gas/12kgasClyinder"
import Gascooker from "../../components/gas/gascooker"
import Banner from "../../components/gas/banner"
import Referal from "../../components/layouts/Referal"
import FullsetGas from "../../components/Fullset/fullset";
const Home = () => {

    return (
        <>
           <Cardslide />
          <br/>  
          <FullsetGas />
          <br/>
          <Cylinder12kgs/>
    
            <Gascooker />
            <br/>  <br/>
          
            <Banner />

        </>
       
        
        
          
         
    
    )
}
export default Home;
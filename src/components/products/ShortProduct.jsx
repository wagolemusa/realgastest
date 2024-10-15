"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import cr1 from '../../../public/images/cr1.png';
import cr3 from '../../../public/images/cr3.png';
import cr4 from '../../../public/images/cr4.png';

const ShortProduct = ({ data }) => {
    console.log("Short", data)

    // const [shortprod = setShortprod] = useState([]);

    // const getshortProduct = () => {
    //     axios.get(`${process.env.ENVIRONMENT_URL}/api/products`, {

    //         headers: {
    
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           }
    //     }).then((res) => {
    //         const myshortprod = res.data.products;
    //         console.log("shoert", myshortprod)
    //         setShortprod(myshortprod)

            
    //     })
        
    //     useEffect(() => getshortProduct(), []);

    // }
   
    

    return (
        <section>
        <div className="short">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                    <div class="card1">
                    <Image src={cr1}class="card-img-top" alt="Fissure in Sandstone"/>
                    <div className="cartprice">
                        <h2>Add To Cart</h2>
                    </div>
                    </div>  
                    <div class="card">
                        <h5 class="card-title">Smart CC Camera</h5>
                        <p class="card-textprice">$269</p>
                        
                    </div>
                  
                    </div> 
                    <div className="col-4">
                    <div class="card1">
                    <Image src={cr3}class="card-img-top" alt="Fissure in Sandstone"/>
                    <div className="cartprice">
                        <h2>Add To Cart</h2>
                    </div>
                    </div>
                    <div class="card">
                        <h5 class="card-title">CC Tv Bullet Camera</h5>
                        <p class="card-textprice">$578</p>

                    
                    </div>    
                    </div>
                    <div className="col-4">
                    <div class="card1">
                    <Image src={cr4}class="card-img-top" alt="Fissure in Sandstone"/>
                    <div className="cartprice">
                        <h2>Add To Cart</h2>
                    </div>
                    </div>
                    <div class="card">
                        <h5 class="card-title">External Web Camera</h5>
                        <p class="card-textprice">$763</p>
                    </div>
                        
                    </div> 
                </div>    
            </div> 
         
        </div>
    </section>
    )
}

export default ShortProduct;







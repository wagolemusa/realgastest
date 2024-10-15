'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import React, { useEffect, useState, Suspense, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

// import './styles.css';

import CartContext from "../../context/CartContext";
import Referal from '../layouts/Referal';
const CookerGas = () => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
  
    const { user } = useContext(AuthContext)
    const router = useRouter()
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/products/cooker`);
          setData(response.data);
        } catch (error) {
          setError('Failed to fetch Data');
          console.error('Error fetching data', error)
        }
      }
      fetchData()
    }, [])
  
    const { addItemToCart } = useContext(CartContext);
  
    // Add to cart function
    const addToCartHandler = (product) => {
      if(!user){
        router.replace("/login")
      return 
      }
      addItemToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        stock: product.stock,
        seller: product.seller,
      });
    };
  
  
    return (
  
      <Suspense>
        <div className="gasscooker">
          <div className="container-fluid">
          <div className='rightbtn'>
              <a href='/' className='title-border'>Gass Cookers</a>
          
              <a href='/cookers' className='btnall'>See All</a>
          </div>
  
          <Swiper
           modules={[Navigation, Pagination, Scrollbar, A11y]}
  
          slidesPerView={3}
          grid={{
            rows: 2,
          }}
          spaceBetween={30}
          className="mySwiper"
  
          navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
  
         
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            }
          }}
        >
  
        <div className="row">
              {data?.gasCooker?.map((gas6kg) => (
                 <SwiperSlide key={gas6kg._id}>
                <div className="col-md">
                  <div className="product-card1">
  
                  <div className="product-card1">
                      <div className="cylinder6kgs">
                      <div className="cyrefill">UGX {gas6kg?.price}</div>
                      <button className="btnStep1" onClick={() => addToCartHandler(gas6kg)}>Add To Cart</button>
                    </div>
                    <Link
                      href={`/product/${gas6kg._id}`}
                      className="hover:text-blue-600"
                    >
                    <Image
                      src={
                        gas6kg?.images[0]
                          ? gas6kg?.images[0].url
                          : "/images/default_product.png"
                      }
                      alt="product anme"
                      height="240"
                      width="240"
                    />
                      <div className='font-bold'>{gas6kg.category}</div>
                    <div className="font-bold text-xl py-3">{gas6kg?.name.slice(0, 18)} </div>
                    </Link>
                  </div>
                 
                </div>
                </div>
         
              </SwiperSlide>
              ))}
            </div>
  
        </Swiper>
          </div>
        </div>
        {/* <Referal /> */}\
        <Referal />
      </Suspense>
    )
  }
export default CookerGas;




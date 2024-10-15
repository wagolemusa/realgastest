'use client'
import React, { useEffect, useState, Suspense, useRef, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CartContext from "../../context/CartContext";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/navigation";


const Cylinder12kgs = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {

  };

const { user } = useContext(AuthContext)
const router = useRouter();

  useEffect(() => {
      async function fetchData() {
          try {
              const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/gas/12kgs`);
              setData(response.data);
          } catch (error) {
              setError('Failed to fetch Data');
              console.error('Error fetching data', error)
          }
      }
      fetchData()
  }, [])
 
  const { addItemToCart } = useContext(CartContext)

    // Add to cart function
    const addToCartHandler = (product) => {
      if(!user){
        router.replace('/login')
      return;
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
  

  return(

    <Suspense>
      <div className="container-fluid">

      <div className='rightbtn'>
            <a href='/' className='title-border'>12kgs, 13kgs, 12.5kgs Refill</a>
        
            <a href='/' className='btnall'>See All</a>
        </div>

        <Swiper
            spaceBetween={50}
            slidesPerView={5}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}

            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"

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
            { data?.get12kgs?.map((gas6kg) =>(
            <SwiperSlide key={gas6kg._id}>
              {/* <div className="slide12 max-w-sm rounded overflow-hidden shadow-lg w-48"> */}
              <div className="product-card12">
              
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
                  
                  <div className="font-bold text-xl py-3">{gas6kg?.name} &nbsp;  {gas6kg?.cylinderSize}</div>
                  
                  <div class="pt-2 pb-10">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2  line-through">UGX {gas6kg?.price}</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2  ">{gas6kg?.category}</span>
                  </div>
                  </Link>
                </div>
               
            
                </SwiperSlide>
              ))}
              
            
        </Swiper>
        </div>
    </Suspense>

  )
}


export default Cylinder12kgs











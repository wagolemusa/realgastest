"use client"
import React, { useEffect, useState, Suspense, useRef, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import CartContext from "../../context/CartContext";

const Cardslide = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const progressContent = useRef(null);
  
  const { addItemToCart } = useContext(CartContext);

  const { user } = useContext(AuthContext)
  const router = useRouter();

  
  useEffect(() => {
      async function fetchData() {
          try {
              const response = await axios.get(`${process.env.ENVIRONMENT_URL}/api/gas`);
              setData(response.data);
          } catch (error) {
              setError('Failed to fetch Data');
              console.error('Error fetching data', error);
          }
      }
      fetchData();
  }, []);

  const addToCartHandler = (product) => {
    if (!user) {
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

  return (
    <Suspense>
      <div className="container-fluid">
        <div className='rightbtn'>
          <a href='/' className='title-border'>6kgs Refill</a>
          <a href='/' className='btnall'>See All</a>
        </div>

        <Swiper
          spaceBetween={50}
          slidesPerView={5}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
        >
          {data?.get6kgs?.map((gas6kg) => (
            <SwiperSlide key={gas6kg._id}>
              <div className="product-card">
                <div className="cylinder6kgs">
                  <div className="cyrefill">UGX {gas6kg?.price}</div>
                  <button className="btnStep1" onClick={() => addToCartHandler(gas6kg)}>Add To Cart</button>
                </div>

                <Link href={`/product/${gas6kg._id}`} className="hover:text-blue-600">
                  <Image
                    src={gas6kg?.images[0] ? gas6kg?.images[0].url : "/images/default_product.png"}
                    alt="product name"
                    height="240"
                    width="240"
                  />
                  <div className="font-bold text-xl py-3">{gas6kg?.name} &nbsp; {gas6kg?.cylinderSize}</div>
                  <div className="pt-2 pb-10">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 line-through">UGX {gas6kg?.price}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">UGX {gas6kg?.discount}</span>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Suspense>
  );
};

export default Cardslide;

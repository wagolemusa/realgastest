"use client";

import React, { useRef, useContext, useEffect } from "react";
import StarRatings from "react-star-ratings";
import BreadCrumbs from "../layouts/BreadCrumbs";
import CartContext from '../../context/CartContext'
import NewReview from "../review/NewReview";
import OrderContext from "../../context/OrderContext";
import Reviews from "../review/Reviews";
import Banner from "../gas/banner";
import Gascooker from "../gas/gascooker";
import Image from "next/image";


const ProductDetails = ({ product }) => {

  const { addItemToCart } = useContext(CartContext)
  
  const { canUserReview, canReview } = useContext(OrderContext)
  
  const imgRef = useRef(null);

  const setImgPreview = (url) => {
    imgRef.current.src = url;
  };

  useEffect(() => {
    canUserReview(product?._id)
  },[canUserReview, product?._id])

  const inStock = product?.stock >= 1;

  const breadCrumbs = [
    { name: "Home", url: "/" },
    {
      name: `${product?.name?.substring(0, 100)} ...`,
      url: `/products/${product?._id}`,
    },
  ];

    // Add to cart function
    const addToCartHandler = () => {
      addItemToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        stock: product.stock,
        seller: product.seller,
      })
    }


  return (
    <>
      {/* <BreadCrumbs breadCrumbs={breadCrumbs} /> */}
      
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <Image
                  ref={imgRef}
                  className="object-cover inline-block"
                  src={
                    product?.images[0]
                      ? product?.images[0].url
                      : "/images/default_product.png"
                  }
                  alt="Product title"
                  width="340"
                  height="340"
                />
              </div>
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {product?.images?.map((img) => (
                  <a key={img._id}
                    className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer"
                    onClick={() => setImgPreview(img?.url)}
                  >
                    <Image
                      className="w-14 h-14"
                      src={img.url}
                      alt="Product title"
                      width="500"
                      height="500"
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>

              <ul className="mb-5 sizeofcylinder">
                <li className="">
                <span className="text-red-500 text-40">{product?.category}</span>&nbsp;&nbsp;
                  <b className="font-medium w-36 inline-block">{product?.size}</b>                
                </li>
              </ul>

              <p className="mb-4 font-semibold text-xl">UGX {product?.price}</p>

              <p className="mb-4 text-gray-500">{product?.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent 
                  rounded-md hover:bg-blue-700"
                  onClick={addToCartHandler}
                  // disabled={!inStock}
                >
                  <i className="fa fa-shopping-cart mr-2"></i>
                  Add to cart
                </button>
              </div>

            </main>
          </div>
        </div>
        <Banner />
        <Gascooker />
      </section>
    </>
  );
};

export default ProductDetails;
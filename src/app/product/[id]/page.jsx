import React from 'react'
import ProductDetails from '../../../components/products/ProductDetails'
import axios from 'axios'

const getProductDetails = async (id) => {
    const { data } = await axios.get(`${process.env.ENVIRONMENT_URL}/api/products/${id}`);
    return data?.product;
};


const ProductDetailsPage = async ({ params }) => {
    const product = await getProductDetails(params.id);
    
    return <ProductDetails product={product} />
}

export default ProductDetailsPage;


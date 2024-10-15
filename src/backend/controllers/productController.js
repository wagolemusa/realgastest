import Product from '../model/product'
import APIFilters from '../utils/APIFilters';
import fs from 'fs'
import { cloudinary, uploads } from '../utils/cloudinary';
import axios from 'axios';

// Post All Products
export const newProduct = async (req, res, next) => {
    // req.body.user = req.user._id;

    // console.log("xxxx",req.body.user )
    const product = await Product.create(req.body);
    res.status(201).json({
      product,
    });
  };


// Get All products
export  const getProducts = async(req, res, next) =>{
    const resPerPage = 1
    const productsCount = await Product.countDocuments()
    const apiFilters = new APIFilters(Product.find(), req.query)
    .search()
    .filter()
    // const products = await Product.find();
    const products = await apiFilters.query.clone();
    const filterdProductsCount = products.length
    apiFilters.pagination(resPerPage);
    res.status(200).json({
        productsCount,
        resPerPage,
        filterdProductsCount,
        products,
    });
}



// Get product by Id
export const getProduct = async(req, res, next) => {
    const product = await Product.findById(req.query.id);
    if(!product){
        res.status(400).json({
            error: "Product not found.",
        })
    }
    res.status(200).json({
        product,
    })
}

// query all 6kgs where set on top
export const query6kgs = async(req, res) =>{
    const get6kgs = await Product.find({ size: "6kgs"}) // and seton: "top"
    return res.status(201).json({
        get6kgs
    })
}


// query all fullset
export const queryFullset = async(req, res) => {
    const fullset = await Product.find({category: "Full-set"})
    return res.status(201).json({
        fullset
    })
}


// query all 12kgs where set 12kgs
export const query12kgs = async(req, res) =>{
    const get12kgs = await Product.find({ size: { $in: ["12kgs", "13kgs", "12.5kgs"] } });
    return res.status(201).json({
        get12kgs
    })
}


// query all where promoation is on
export const queryPromo = async(req, res) =>{
    const getPro = await Product.find({ promotion: "on" })
    return res.status(201).json({
        getPro
    })
}



// Query three Data
export const querythreeProduct = async(req, res, next) => {
    const product = await Product.find().sort({_id: -1}).limit(3)
    if(!product){
        res.status(400).json({
            error: "Product not Found."
        })
    }
    res.status(200).json({
        product,
    })
}


// query all Gas Cookers
export const queryGasCooker = async(req, res) =>{
    const gasCooker = await Product.find({ category: {$in: ["Gas Cookers", "Electric cookers"]}});
    return res.status(201).json({
        gasCooker
    })
}

// query all full-set 12kgs
export const queryfullSet12kgs = async(req, res) =>{
    const gasfullset = await Product.find({ category: {$in: ["Full-set"]}});
    return res.status(201).json({
        gasfullset
    })
}


// query all Gas Cookers
export const querybanners = async(req, res) =>{
    const gasBanner = await Product.find({ category: {$in: ["Regulator", "Banners", "Horse pipe", "Grills"]}});
    return res.status(201).json({
        gasBanner
    })
}


// upload multiple images
export const uploadProductImages = async(req, res, next) => {
    let product = await Product.findById(req.query.id);
    if(!product){
        res.status(404).json({
            error: "Product not found"
        })
    }
    const uploader = async(path) => await uploads(path, "npc");
    const urls = []
    const files = req.files;

    for(const file of files){
        const { path } = file
        console.log("path", path)
        const imgUrl = await uploader(path)
        urls.push(imgUrl)
        fs.unlinkSync(path)
    }
    product = await Product.findByIdAndUpdate(req.query.id, {
        images: urls,
    });
    res.status(200).json({
        data: urls,
        product,
    })
}


// update Products
export const updateProduct = async(req, res, next) => {
    let product = await Product.findById(req.query.id);
    if(!product){
        res.status(404).json({
            error: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
        product,
    })
};


// Delete images associated with the product
export const deleteProduct = async(req, res, next) => {
    let product = await Product.findById(req.query.id);

    if(!product){
        res.status(404).json({
            error: "Product not found"
        })
    }  
    // images associated with Ihe products
    for(let i = 0; i < product.images.length; i++){
        const res = await cloudinary.v2.uploader.destroy(
            product.images[i].public_id
        );
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
    })
};

// create views and rating
export const createProductReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req?.user?._id,
      rating: Number(rating),
      comment,
    };
  
    let product = await Product.findById(productId);
  
    if (!product) {
      return  res.status(200).json({
        success: true,
    });
    }
  
    const isReviewed = product?.reviews?.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product?.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product?.reviews.push(review);
    }
    product.ratings =
      product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
  
    await product?.save();
  
    res.status(200).json({
      success: true,
    });
  };
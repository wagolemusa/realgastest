
import { genSaltSync } from 'bcryptjs'
import Gas from '../model/gas'
import APIFilters from '../utils/APIFilters';
import fs from 'fs'
import { cloudinary, uploads } from '../utils/cloudinary';

// Save gas 
export const newGas = async(req, res) => {
    try{
        let gassave = new Gas ({
            ...req.body
        })
        await gassave.save()

    }catch(error){
        console.log(error)
    }
}



// Get All Customers
export  const getGasData = async(req, res, next) =>{
    const resPerPage = 10
    const apiFilters = new APIFilters(Gas.find(), req.query)
    .search()
    .filter()

    const gasDeta = await apiFilters.query.clone();
    const filterdProductsCount = gasDeta.length
    apiFilters.pagination(resPerPage);

    res.status(200).json({
        resPerPage,
        filterdProductsCount,
        gasDeta,
    });
}


// get Gas by Id
export const getGasById = async(req, res) =>{
    const getGas = await Gas.findById(req.query.id);
    if(!getGas){
        return res.status(401).json({
            message: "No Data fund"
        })
    }
    return res.status(201).json({
        getGas
    })
}


// query all 6kgs where set on top
export const query6kgs = async(req, res) =>{
    const get6kgs = await Gas.find({ cylinderSize: "6kgs"}) // and seton: "top"
    return res.status(201).json({
        get6kgs
    })
}


// query all 12kgs where set 12kgs
export const query12kgs = async(req, res) =>{
    const get12kgs = await Gas.find({ cylinderSize: { $in: ["12kgs", "13kgs", "12.5kgs"] } });
    return res.status(201).json({
        get12kgs
    })
}

// query all where promoation is on
export const queryPromo = async(req, res) =>{
    const getPro = await Gas.find({ promotion: "on" })
    return res.status(201).json({
        getPro
    })
}



// update Products
export const updateGas = async(req, res, next) => {
    let gas = await Gas.findById(req.query.id);

    if(!gas){
        res.status(404).json({
            error: "No Gas found"
        })
    }
    gas = await Gas.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
        gas,
    })
};



// Delete images associated with the product
export const deleteGas = async(req, res, next) => {
    let gas = await Gas.findById(req.query.id);

    if(!gas){
        res.status(404).json({
            error: "No Data found"
        })
    }  
    // images associated with Ihe products
    for(let i = 0; i < gas.images.length; i++){
        const res = await cloudinary.v2.uploader.destroy(
            gas.images[i].public_id
        );
    }
    await gas.deleteOne();
    res.status(200).json({
        success: true,
    })
};



// upload multiple images
export const uploadProductImages = async(req, res, next) => {

    let gas = await Gas.findById(req.query.id);

    if(!gas){
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
    gas = await Gas.findByIdAndUpdate(req.query.id, {
        images: urls,
    });
    res.status(200).json({
        data: urls,
        gas,
    })
}





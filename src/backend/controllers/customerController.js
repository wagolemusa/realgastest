import Customer from "../model/customer";
import APIFilters from '../utils/APIFilters';


// create customer
export const newCustomer = async(req, res) => {
    const customer = await Customer.create(req.body)
    return res.status(201).json({
        customer
    })
}


// Get All Customers
export  const getCustomers = async(req, res, next) =>{

    const resPerPage = 1
    const productsCount = await Customer.countDocuments()

    const apiFilters = new APIFilters(Customer.find(), req.query)
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


// get customers
export const getCustomerById = async(req, res) =>{
    const customer = await Customer.findById(req.query.id);
    if(!customer){
        return res.status(401).json({
            message: "customers not fund"
        })
    }
    return res.status(201).json({
        customer
    })
}



// update Products
export const updateCustomer = async(req, res, next) => {
    let customer = await Customer.findById(req.query.id);

    if(!customer){
        res.status(404).json({
            error: "Customer not found"
        })
    }
    customer = await Customer.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
        customer,
    })
};



// Delete images associated with the product
export const deleteCustomer = async(req, res, next) => {
    let customer = await Customer.findById(req.query.id);

    if(!customer){
        res.status(404).json({
            error: "Product not found"
        })
    }  

    await customer.deleteOne();
    res.status(200).json({
        success: true,
    })
};



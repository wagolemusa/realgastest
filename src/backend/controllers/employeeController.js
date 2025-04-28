import Employee from "../model/employee"
import APIFilters from '../utils/APIFilters';

// create Employees
export const newEmployee = async(req, res) => {
    const employee = await Employee.create(req.body)
    return res.status(201).json({
        employee
    })
}


// Get All Employees
export  const getEmployee = async(req, res, next) =>{

    const resPerPage = 1
    const productsCount = await Employee.countDocuments()

    const apiFilters = new APIFilters(Employee.find(), req.query)
    .search()
    .filter()
    // const products = await Product.find();
    const employee = await apiFilters.query.clone();

    apiFilters.pagination(resPerPage);
    res.status(200).json({
        productsCount,
        resPerPage,
        employee,
    });
}


// get employess by Id
export const getEmployeeById = async(req, res) =>{
    const employee = await Employee.findById(req.query.id);
    if(!employee){
        return res.status(401).json({
            message: "customers not fund"
        })
    }
    return res.status(201).json({
        employee
    })
}



// update employees
export const updateEmployee = async(req, res, next) => {
    let employee = await Employee.findById(req.query.id);

    if(!employee){
        res.status(404).json({
            error: "Customer not found"
        })
    }
    employee = await Employee.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
        employee,
    })
};

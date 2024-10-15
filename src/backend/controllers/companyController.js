import Company from '../model/company';

// Create Company
export const newCompany = async(req, res) => {
    const company = await Company.create(req.body);
    return res.status(201).json({
        company
    })
}



// query Company Details

export const getCompanyData = async(req, res) => {
    const company = await Company.find();
    return res.status(201).json({
        company
    })
}


// get customers
export const getCompanyById = async(req, res) =>{
    const company = await company.findById(req.query.id);
    if(!company){
        return res.status(401).json({
            message: "company not fund"
        })
    }
    return res.status(201).json({
        company
    })
}


// Delete Company data
export const deleteCompany = async(req, res, next) => {
    let company = await Company.findById(req.query.id);
    if(!company){
        res.status(404).json({
            error: "Product not found"
        })
    }  
    await company.deleteOne();
    res.status(200).json({
        success: true,
    })
};


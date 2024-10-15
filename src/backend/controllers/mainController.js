import Branch from '../model/branch';


// Create branch
export const newBranch = async(req, res, next) => {
    const branch = await Branch.create(req.body);
    return res.status(201).json({
        branch,
    });
};

// Get all branches
export const getBranches = async(req, res) => {

    const branch  = await Branch.find()
        if(!branch){
            return res.status(401).json({
                message: "Branch not found"
            })
        }
        return res.status(201).json({
            branch
        })
}


// get all branch 
export const getBranchById = async(req, res) =>{
    const branch = await Branch.findById(req.query.id);
    if(!branch){
        return res.status(401).json({
            message: "customers not fund"
        })
    }
    return res.status(201).json({
        branch
    })
}


// update Branch
export const updateBranches = async(req, res, next) => {
    let branch = await Branch.findById(req.query.id);

    if(!branch){
        res.status(404).json({
            error: "Customer not found"
        })
    }
    branch = await Branch.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
        branch,
    })
};


// Delete branch data
export const deleteBranch = async(req, res, next) => {
    let branch = await Branch.findById(req.query.id);

    if(!branch){
        res.status(404).json({
            error: "Product not found"
        })
    }  

    await branch.deleteOne();
    res.status(200).json({
        success: true,
    })
};



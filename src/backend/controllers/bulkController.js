import Bulk from '../model/bulk';

export const newGasBulk = async(req, res, next) => {
    try{
        let bulkgas  = new Bulk({
            ...req.body
        })
        await bulkgas.save();
        return res.status(201).json({
            bulkgas
        });
    }catch(error){
        console.log(error)
    }    
};


// Query Gas bought
export const getBulkgas = async(req, res) => {
    const bulkgas = await Bulk.find();
    if(!bulkgas){
        return res.status(400).json({
            message: "There is No Gas Records"
        })
    }
    return res.status(201).json({
        bulkgas
    })
}


// get bulk Gas by ID
export const getBulkById = async(req, res) => {
    const bulk = await Bulk.findById(req.query.id);
    if(!bulk){
        return res.status(401).json({
            message: "No Data Find"
        })
    }
    return res.status(200).json({
        bulk
    })
}


// update Bulk
export const updateBulk = async(req, res) => {
    let bulk = await Bulk.findById(req.query.id);
    if(!bulk){
        res.status(401).json({
            message: "Data not find"
        })
    }
    bulk = await Bulk.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
        bulk
    })
}



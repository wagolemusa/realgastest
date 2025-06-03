import Point from "../model/point";
import Withdrowpoint from "../model/withdrowpoint";

// create points
export const newPoint = async(req, res) => {

    try{
        const {customerName, phone, cylinderSize,cylinderType } = req.body;
        
        let phoneNumber = await Point.findOne({phone})

        if(phoneNumber){
            await Point.findOneAndUpdate(
                { phone },
                { $inc: { points: 2000}}
            )
        
        } else{
            await Point.create({
                customerName,
                phone,
                cylinderSize,
                cylinderType,

            })
        }

        return res.status(201).json({
            success: true,
            // point
        })

    } catch(error){
        console.log(error);
    }

}


// query points Data
export const getPointData = async(req, res) => {
    const point = await Point.find();
    return res.status(201).json({
        point
    })
}


// get customers
export const getPointById = async(req, res) =>{
    const point = await Point.findById(req.query.id);
    if(!point){
        return res.status(401).json({
            message: "point not fund"
        })
    }
    return res.status(201).json({
        point
    })
}


// Delete Company data
export const deletePoint = async(req, res, next) => {
    let point = await Point.findById(req.query.id);

    if(!point){
        res.status(404).json({
            error: "point not found"
        })
    }  

    await point.deleteOne();
    res.status(200).json({
        success: true,
    })
};


// update installment if Complate payment or not
export const updatepoints = async (req, res, next) => {
    try {
        let point = await Point.findById(req.query.id);

        if (!point) {
            return res.status(404).json({
                error: "Data not found"
            });
        }

        const { customerName, phone, cylinderType, cylinderSize } = req.body;

        // Find the initial amount of points
        let initialPoints = point.points; // Assuming points is a property of the found Point document

        // Update the point document
        point = await Point.findByIdAndUpdate(req.query.id, req.body, { new: true });

        // Find the updated points
        let updatedPoints = point.points;

        // Calculate the difference in points
        let pointsDifference = parseFloat(initialPoints) - parseFloat(updatedPoints);
        // Save statement
        let statement = new Withdrowpoint({
            customerName,
            phone,
            cylinderType,
            cylinderSize,
            points: pointsDifference // Assuming pointsDifference is relevant to the statement
        });

        console.log("Statement:", statement);
        await statement.save();

        res.status(200).json({
            statement,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server Error",
        });
    }
};


// Search by points
export const getSearchPoints = async (req, res) => {
    try {
      const { phone } = req.body;
  
      console.log('Request Body:', req.body);
  
      // Initialize query object
      let query = {};


      // Validate and add branch if provided
      if (phone) {
        query.phone = phone;
      }
      const point = await Point.find(query)


      console.log("pppppp", point)

      res.status(200).json({
        success: true,
        point,
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  };
  
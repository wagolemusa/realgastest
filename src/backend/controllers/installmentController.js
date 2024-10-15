import Installment from "../model/installment";
import Statement from "../model/statement";

// create installment
export const newInstallment = async (req, res) => {
    try {
        const { customerName, phone, cylinderType, cylinderSize, category, amount, installmentPaid } = req.body;

        // Find the initial amount paid for the given installment
        let initialAmountPaid = await Installment.findOne({ installmentPaid });

        // Find the initial total amount
        let initialAmount = await Installment.findOne({ amount });

        // Find if the phone number exists in the database
        let phoneNumber = await Installment.findOne({ phone });

        // Initialize totalPaid and balance
        let totalPaid = parseFloat(installmentPaid);
        let balance;

        if (phoneNumber) {
            // If phone number exists, calculate totalPaid and balance
            totalPaid = initialAmountPaid ? parseFloat(initialAmountPaid.installmentPaid) + parseFloat(installmentPaid) : parseFloat(installmentPaid);
            balance = initialAmount ? parseFloat(initialAmount.amount) - totalPaid : parseFloat(amount) - totalPaid;
        } else {
            // If phone number does not exist, calculate balance based on installmentPaid only
            balance = parseFloat(amount) - totalPaid;
        }

        console.log("Initial Amount Paid:", initialAmountPaid ? initialAmountPaid.installmentPaid : 0);
        console.log("Total Amount:", initialAmount ? initialAmount.amount : amount);
        console.log("Total Paid:", totalPaid);
        console.log("Balance:", balance);

        // Create a new installment entry
        let installmentPay = new Installment({
            customerName,
            phone,
            cylinderType,
            cylinderSize,
            category,
            amount,
            installmentPaid,
            totalPaid,
            balance
        });

              // Save statems
              let statement = new Statement({
                customerName,
                phone,
                cylinderType,
                cylinderSize,
                category,
                amount,
                installmentPaid,
                totalPaid,
                balance
            });
            console.log("Data:", installmentPay);
            await installmentPay.save();
            await statement.save()

        return res.status(201).json({
            success: true,
            message: "Installment Saved"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "No Data Saved"
        });
    }
}


// update installment Data 
export const secandeInstallment = async (req, res) => {
    try {
        const { customerName, phone, cylinderType, cylinderSize, category, amount, installmentPaid } = req.body;

        // Find the initial amount paid for the given installment
        let intialAmountPaid = await Installment.findOne({ installmentPaid });
        
        // Find the initial total amount
        let intialAmount = await Installment.findOne({ amount });

        // Ensure values are treated as numbers
        let totalPaid = parseFloat(intialAmountPaid.installmentPaid) + parseFloat(installmentPaid);

        // Calculate the remaining balance
        let balance = parseFloat(intialAmount.amount) - totalPaid;

        console.log("Initial Amount Paid:", intialAmountPaid.installmentPaid);
        console.log("Total Amount:", intialAmount.amount);
        console.log("Total Paid:", totalPaid);
        console.log("Balance:", balance);

        // Create a new installment entry
        let installmentPay = new Installment({
            customerName,
            phone,
            cylinderType,
            cylinderSize,
            category,
            amount,
            installmentPaid,
            totalPaid,
            balance
        });

        // Save statems
        let statement = new Statement({
            customerName,
            phone,
            cylinderType,
            cylinderSize,
            category,
            amount,
            installmentPaid,
            totalPaid,
            balance
        });
        console.log("Data:", installmentPay);
        await installmentPay.save();
        await statement.save()

        return res.status(201).json({
            success: true,
            message: "Installment Saved"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "No Data Saved"
        });
    }
}



// query points Data
export const getInstallment = async(req, res) => {
    const installment = await Installment.find();
    return res.status(201).json({
        installment
    })
}


// get customers
export const getinstallmentById = async(req, res) =>{
    const installment = await Installment.findById(req.query.id);
    if(!installment){
        return res.status(401).json({
            message: "point not fund"
        })
    }
    return res.status(201).json({
        installment
    })
}


// update installment if Complate payment or not
export const updateinstall = async(req, res, next) => {

    let installment = await Installment.findById(req.query.id);

    if(!installment){
        res.status(404).json({
            error: "Data not found"
        })
    }
    const { customerName, phone, cylinderType, cylinderSize, category, amount, installmentPaid } = req.body;

    // Find the initial amount paid for the given installment
    let intialAmountPaid = await Installment.findOne({ installmentPaid });
    
    // Find the initial total amount
    let intialAmount = await Installment.findOne({ amount });

    // Ensure values are treated as numbers
    let totalPaid = parseFloat(intialAmountPaid.installmentPaid) + parseFloat(installmentPaid);

    // Calculate the remaining balance
    let balance = parseFloat(intialAmount.amount) - totalPaid;

    
    installment = await Installment.findByIdAndUpdate(req.query.id, req.body)


            // Save statems
            let statement = new Statement({
                customerName,
                phone,
                cylinderType,
                cylinderSize,
                category,
                amount,
                installmentPaid,
                totalPaid,
                balance
            });
            console.log("statement:", statement);
            await statement.save()

    res.status(200).json({
        installment,
    })
};
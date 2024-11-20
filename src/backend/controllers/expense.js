import Expense from "../model/expense";

// Create expenses
export const  newExpense = async(req, res) =>{

    try{
        let expense = new Expense({
            ...req.body
        })
        await expense.save();
        return res.status(201).json({
            expense
        })
    }catch(error){
        console.log(error)
    }
}


// Query expense
export const getExpense = async(req, res) => {
    const expense = await Expense.find()
    return res.status(200).json({
        expense
    })
}


// update the expense
export const updateExpense = async(req, res, next) => {
    let expense = await Expense.findById(req.query.id);
    if(!expense){
        res.status(404).json({
            error: "Expense not found"
        })
    }
    expense = await Expense.findByIdAndUpdate(req.query.id, req.body)
    res.status(200).json({
        expense,
    })
};


// get all expense  by Id
export const getExpenseById = async(req, res) =>{
    const expense = await Expense.findById(req.query.id);
    if(!expense){
        return res.status(401).json({
            message: "Expenses not fund"
        })
    }
    return res.status(201).json({
        expense
    })
}
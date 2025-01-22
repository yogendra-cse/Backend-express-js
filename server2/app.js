const mongoose = require('mongoose');
const express = require("express");
// import { message } from 'statuses';
// import { v4 as uuidv4 } from 'uuid';
const {v4 : uuidV4} = require("uuid");
const { message } = require('statuses');
const app = express();
// middleware given by express
// middleware means An intermediate between the client and the server 
app.use(express.json()); 
mongoose.connect("mongodb://localhost:27017/expenses_data").then(() => {
    console.log("connected to MongoDB")
})
const expenseSchema =  new mongoose.Schema({
    id:{ type: String, required: true,unique: true},
    title:{type:String,required: true},
    amount:{type:Number,required: true}
})
const Expense = mongoose.model("Expense",expenseSchema)

const expenses = [
  {
    id: 1,
    title: "Food",
    amount: 2000,
  },
  {
    id: 2,
    title: "Petrol",
    amount: 1000,
  },
  {
    id: 3,
    title: "Service",
    amount: 3000,
  },
];


app.get("/api/expenses", async(req, res) => {
//   console.log(req.query);
    const expenses = await Expense.find();
    if(!expenses){
        res.status(404).send({ message : "No expenses found"})
    }
  res.status(200).json(expenses);
});

app.get("/api/expenses/:id",async(req,res) => {
    const { id } = req.params
    try{
    const expenses = await Expense.findOne({id});
    if(!expenses){
        res.status(404).send({ message : "No expenses found with ID : {id}"})
    }else{
        res.status(200).json(expenses)
    }
    }catch(error){
        res.status(500).json({message: "Internal server eroor"})
    }
})

app.delete("/api/expenses/:id",async (req,res) => {
    const { id } = req.params
    try{
        const deletedExpenses = await Expense.findOneAndDelete({id})
        if(!deletedExpenses){

            res.status(404).json({message:"Expense not found"})
            return
        }
        // res.status(200).json({message:"Deleted expense: "})
        res.status(200).json(deletedExpenses)
    }catch(Error){
        res.status(404).json({message :"Internal server error"})
    }
})

app.get("/api/expenses/:id",async(req,res) => {
    const { id } = req.params
    try{
    const expenses = await Expense.findOne({id});
    if(!expenses){
        res.status(404).send({ message : "No expenses found with ID : {id}"})
    }else{
        const {newTitle,newAmount}=req.body
    }
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
})

app.put("/api/expenses/:id",async(req,res) => {
    const { id } = req.params
    const { title,amount} = req.body
    try{
        const expenses = await Expense.findOneAndUpdate({id},{
            title,
            amount
        })
        if(!expenses){
            res.status(404).send({ message : "No expenses found with given ID"})
        }else{
            res.status(200).json({message: "Updated sucessfully"})
        }
    }catch(Error){
        res.status(500).json({message: "Internal server error"})
    }
})

// await must be used within async function block
app.post("/api/expenses",async(req,res) => {
    console.log(req.body)
    try{
    const { title,amount } =req.body
    if( !title || !amount){
        res.status(400).json({ message : "Please provide both title and amount" })
    }
    const newExpense = new Expense({
        id : uuidV4(),
        title,
        amount
    })
    // If the key and the value is of same variable
    // to generate an unique id we have unique package
    const savedExpense = await newExpense.save()
    res.status(201).json(savedExpense)
}catch(error){
    res.status(500).json({message: "Internal server error"})
}
})


// ''
// app.get("/api/expenses/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const expense = expenses.find((expense) => expense.id === id);
//   if (!expense) {
//     res.status(404).json({ message: "Not Found" });
//     return;
//   }
//   res.status(200).json(expense);
// });

// app.delete("/api/expenses/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = expenses.findIndex((expense) => expense.id === id);
//   if (index === -1) {
//     res.status(404).json({ message: "Not Found" });
//     return;
//   }
//   expenses.splice(index, 1); 
//   res.status(200).json({ message: "Deletion of expense done sucessfully" });
// });


// app.put("/api/expenses/:id", (req, res) => {
//   console.log("Request body:", req.body); 
//     const id = parseInt(req.params.id);
//   const expense = expenses.find((expense) => expense.id === id);
//   if (!expense) {
//     res.status(404).json({ message: "Not Found" });
//     return;
//   }

//   const { title, amount } = req.body;
//   console.log("Parsed body:", title, amount); 

//   if (title) expense.title = title;
//   if (amount) expense.amount = amount;

//   res.status(200).json({ message: "Expense updated successfully", expense });
// });




app.listen(3000, () => {
  console.log("Server is running");
});



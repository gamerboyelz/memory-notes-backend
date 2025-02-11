//importing and creating an instance of express object or class in the variable app 
const express = require("express")
const app = express()

require("dotenv").config()

app.listen(process.env.PORT, ()=>{
    console.log("we are listening to port 4000")
})

//setting up routes 
app.get('/',(req, res)=>{
    res.send('the get method was used')
    console.log("the get method was used")

})

app.post('/',(req, res)=>{
   res.send(' the post method was used') 
   console.log("the post method was used")
})

app.patch('/',(req,res)=>{
    res.send('/','the patch method was used')
    console.log("the patch method was used")
})
app.delete('/',(req,res)=>{
    res.send('/','the delete method was used')
    console.log("the delete method was used")
})

//connecting to Mongo db database using mongoose
try {
const mongoose = require("mongoose")
    mongoose.connect("mongodb+srv://heltonellison:BTOFw4g3jbXIcmSY@heltondatabase.0qjhk.mongodb.net/?retryWrites=true&w=majority&appName=HeltonDataBase")
    console.log("database is connected")
    
} catch (error) {
    console.log("could not connect", error)
    
}


//importing and creating an instance of express object or class in the variable app 
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
//IMPLEMENTING CORS OR cross origin resource features so react app can sed post request to express server
app.use(cors({
    origin: "http://localhost:5173",//allows request for 
    methods:['GET','POST','PATCH','DELETE'], // Allowed HTTP methods
    credentials: true // Allow sending cookies with requests
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config()


//connecting to Mongo db database using mongoose
try {
        mongoose.connect(process.env.MONGO_DB_URI)
        console.log("database is connected")
        
    } catch (error) {
        console.log("could not connect", error)
        
    }

// Define Mongoose Schema & Model--------------------------
const formDataSchema = new mongoose.Schema({
    task: String
}, {timestamps:true} );

const FormData = mongoose.model('task', formDataSchema)
//-------------------------------------------------------


//setting up routes 

// router to receive form submission from react app and save it to the database
app.post('/submit-form', async(req, res)=>{

    try {
        
        const {task} = req.body; // destructuring the formdata variable or object from the post request body sent from react app
        // if(!text){
        //     return res.status(400).json({message: "text field is required"})
        // }
        console.log("the formdata field was received:",{task})
    
        const newEntry = new FormData({task})
        await newEntry.save()
        res.status(201).json({message: 'data was saved successfully'})
    } catch (error) {
        res.status(500).json({message: "server error", error})
        
    }
   
})

//get data from mongo db 
app.get('/get-tasks',async(req, res)=>{
    try {
        const tasks = await FormData.find()// Fetch all documents from the database specifically retrieves all records from the tasks collection that was defined in the model.
        console.log(tasks)
        res.status(200).json(tasks)//sends tasks data to front end when route is requested.

    } catch (error) {
        res.status(500).json({message: "server error", error})
        
    }

})


app.patch('/',(req,res)=>{
    res.send('the patch method was used')
    console.log("the patch method was used")
})
app.delete('/',(req,res)=>{
    res.send('the delete method was used')
    console.log("the delete method was used")
})


//start server
app.listen(process.env.PORT, ()=>{
    console.log("we are listening to port:",process.env.PORT)
})

//




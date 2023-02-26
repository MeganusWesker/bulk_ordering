const express= require('express');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
 const cors = require('cors')

const errorMidddleware = require("./middlewares/error");


// setting up config file
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json({limit:"50mb"}));
 app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({limit:"50mb",extended:true}))


// Importing all routes 
const products = require('./routes/products');
const user = require('./routes/auth');




app.use('/api/v1',products);
app.use('/api/v1',user);



app.get("/",(req,res)=>{
    res.send("working");
});

// //middleware to handle errors
app.use(errorMidddleware);

module.exports = app;
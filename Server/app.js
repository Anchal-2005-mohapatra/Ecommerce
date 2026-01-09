const mongoose = require('mongoose');
const express = require('express');
const connectDb = require("./config/db");
const allroutes = require('./routes/allroutes');
const app = express();
const cors =require ('cors');
const allowedOrigins = [
    'http://localhost:3000',
    'http://10.12.123.146:3000',
    'http://10.132.72.146:3000',
    'http://10.53.70.146:3000',
    ' http://192.168.100.8:3000'
];

app.use(cors({
    origin: function(origin, callback) {
      
        if(!origin) return callback(null, true); 
        if(allowedOrigins.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


app.use(express.json());
app.use('/api', allroutes);
connectDb();

app.listen(5000,"0.0.0.0", () => {
    console.log("the backend is running on the port", 5000)
})

// app.listen(5000, () => {
//     console.log("the backend is running on the port", 5000)
// })

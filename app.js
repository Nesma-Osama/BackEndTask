const mongoose = require('mongoose');
const express=require('express');
const cors=require('cors');
const UserRouter=require('./Router/User');
const PostRouter=require('./Router/Post');

const dotenv = require('dotenv');
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.URL);
app.use('/User',UserRouter);
app.use('/Post',PostRouter);

app.listen(3100,()=>{
    console.log('Your app is running  on port 3100');
})

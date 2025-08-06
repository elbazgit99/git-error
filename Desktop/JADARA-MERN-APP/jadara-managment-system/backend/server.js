import express from "express";
import nodemon from "nodemon";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config()

const port = process.env.PORT
const db = process.env.MONGOBD_URI




app.get('/',(req,res)=>{
  res.send('hello Ikram!')
});
app.get('/user',(req,res)=>{
  res.send('hello Ikram!')
});

// mongoose.connect(db).then(()=>{
//   console.log('connection to db success');
// }).catch((err)=>{
//   console.log(err);
// });


const connectDB = async () => {
  try {
    const connect = await mongoose.connect(db)
  } catch (error) {
    console.log(error)
    console.error(error,"failed to connect")
  }
}

app.listen(port,()=>{
  connectDB
  console.log(`app listinig port ${port}`);
});
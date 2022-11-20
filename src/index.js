const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const dotenv = "mongodb+srv://ThurpatiNainesh:nain@cluster0.4uuwz0s.mongodb.net/test"
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/category")
const multer = require("multer")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

mongoose
  .connect(dotenv,
    {
      useNewUrlParser: true,
      useUnifiedTopology:true,

    }
  ).then(console.log("connected mongodb"))
   .catch((err) => console.log(err))
// app.use("/",(req,res)=>{
//     console.log("hey this is main url ")
// })
const storage = multer.diskStorage({
  // file location
  destination:(req,file,cb)=>{
    cb(null,"hello.jpeg")
  },
  // file name we arte giving i9n req.body
  filename:(req,file,cb)=>{
    cb(null,req.body.name);
  }
})
const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("file has be uploaded")
})
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/category",categoryRoute)


app.listen("5000",()=>{
    console.log("Backend is running")
})
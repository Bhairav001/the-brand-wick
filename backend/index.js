const express = require("express")

const cors = require("cors");
const { userRouter } = require("./routes/User.route");
const { connection } = require("./config/db");

const app = express();

require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Registration form");
})


app.use("/users",userRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log({msg:"connected to DB"})
    } catch (error) {
        console.log({error:error.message})
    }
   console.log({msg:"server is running on port 8080"})
})
const express = require("express");
const {connection} = require("./db");
const cors = require("cors");
const {authenticate} = require("./middleware/auth.middleware");
const { userRouter } = require("./routes/User.route");
const { bookRouter } = require("./routes/Book.route");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/books",bookRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB");
    } catch (error) {
        console.log(error.message);
    }
    console.log("server running at port: 8080");
})
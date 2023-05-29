import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth-route.js"
import urlsRoute from "./routes/urls-route.js"
import userRoute from "./routes/users-route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()
const PORT = 8000
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to mongoDB")
    } catch (error) {
      throw error
    }
};

mongoose.connection.on("disconnected", () =>{
    // public ip in mongo atlas 0.0.0.0/0
    console.log("mongoDB disconnected!")
})


// midgard (middleware)
app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use("/api", urlsRoute)
app.get('/about', (req, res) => {
  res.send('This is about route')
})
// app.use("/auth", authRoute)
// app.use("/users", userRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(PORT, ()=>{
    connect()
    console.log(`connected to backend! localhost:${PORT}`)
})

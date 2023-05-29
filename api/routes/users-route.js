import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user-ctrl.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
// import Url  from "../models/Url.js"

// import express, { Router } from "express"


const router  = express.Router();

////CREATE
////router.post("/", createUser)

// router.get("/checkauthen", verifyToken, (req,res,next)=>{
//     res.send("Hello You are Login")
// })
// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE by ID
router.put("/update/:id", verifyUser, updateUser)
//GET by ID
router.get("/get/:id", verifyUser, getUser)
//GET_ALL
router.get("/gets/", verifyUser, getUsers)
//DELETE
router.delete("/del/:id", verifyAdmin, deleteUser)

export default router
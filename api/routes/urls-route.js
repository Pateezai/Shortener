import express from "express"
// import Url  from "../models/Url.js"
import { createUrl, deleteUrl, getUrl, getUrls, redirectUrl, updateUrl } from "../controllers/url-ctrl.js";
import { verifyAdmin } from "../utils/verifyToken.js";
// import express, { Router } from "express"


const router  = express.Router();

//CREATE
router.post("/create/", createUrl)
//REDIRECT TO OG URL
router.get("/:messege", redirectUrl)
//UPDATE by ID
router.put("/update/id/:id", updateUrl)
// router.put("/update/id/:id", verifyAdmin, updateUrl)
//GET by ID
router.get("/id/:id", getUrl)
//GET_ALL
router.get("/", getUrls)
//DELETE
router.delete("/del/id/:id", deleteUrl)
// router.delete("/del/id/:id", verifyAdmin, deleteUrl)

export default router
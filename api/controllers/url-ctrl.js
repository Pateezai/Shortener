import Url from "../models/Url.js"
import randomstring from "randomstring"

//CREATE
export const createUrl = async (req,res,next)=>{
    // const original = req.body.original;
    let custom = req.body.custom;

    if(!custom){
        custom = randomstring.generate(5)
    }

    const short = `${req.protocol}://${req.headers.host}/${custom}`


    const newUrl = new Url({
        original: req.body.original,
        custom: custom,
        shorturl: short
    })
    
    try{
        const savedUrl = await newUrl.save()
        res.status(200).json(savedUrl)
    }catch(err){
        next(err);
    }
}

//REDIRECT TO OG URL
export const redirectUrl = async (req,res,next)=>{
    try{
        const result = await Url.findOne({custom: req.params.messege})
        if(result){
            res.redirect(result.original);
        }
    }catch(err){
        next(err);
        }

    // try {
    //     const url = await Url.findOne({ custom: req.params.custom });
    //     if (!url) {
    //       return res.status(404).json({ message: "URL not found" });
    //     }
    //     res.redirect(url.original);
    //   } catch (err) {
    //     next(err);
    //   }
}



//UPDATE
export const updateUrl = async (req,res,next)=>{
    //const newUrl = new Url(req.body) dont need this cuz we are inside our db?
    
    try{
        const updatedUrl = await Url.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        const short = `${req.protocol}://${req.headers.host}/${updatedUrl.custom}`;
        updatedUrl.shorturl = short;
        await updatedUrl.save();
        res.status(200).json(updatedUrl)
    }catch(err){
        next(err);
    }
}
//DELETE
export const deleteUrl = async (req,res,next)=>{
    try{
        await Url.findByIdAndDelete(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json("This URL has been deleted!!")
    }catch(err){
        next(err);
    }
}
//GETBYID
export const getUrl = async (req,res,next)=>{
    try{
        const url = await Url.findById(
            req.params.id
        )
        res.status(200).json(url)
    }catch(err){
        next(err);
    }
}
//GETALL
export const getUrls = async (req,res,next)=>{
    try{
        const urls = await Url.find(req.query).limit(req.query.limit)
        res.status(200).json(urls)
    }catch(err){
        next(err);
    }
}
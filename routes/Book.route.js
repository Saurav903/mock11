const express = require("express");

const {BookModel} = require("../models/Book.model");
const {UserModel} = require("../models/User.model")
const bookRouter = express.Router();

bookRouter.get("/",async(req,res)=>{
    const books = await BookModel.find();
    res.status(200).json({status:200,"message":"get books","books":books})
})
bookRouter.get("/",async(req,res)=>{
    const q = req.query.category;
    const books = await BookModel.find({category:q});
    res.status(200).json({status:200,"message":"get books by id","books":books})
})
bookRouter.get("/:id",async(req,res)=>{
    const upid = req.params.id;
    const books = await BookModel.find({_id:upid});
    res.status(200).json({status:200,"message":"get books by id","books":books})
})

bookRouter.post("/",async(req,res)=>{
    const {title,author,category,price,quantity} = req.body;
    const admin = req.headers.admin;
    const books = await UserModel.find({isAdmin:admin});

    if(books[0].isAdmin === true){
        const book = new BookModel({title,author,category,price,quantity});
        await book.save();
        res.status(201).json({status:201,book,message:"book has been added"});
    }else{
        res.send("not added or you are not admin")
    }
})
bookRouter.patch("/:id",async(req,res)=>{
    const upid = req.params.id;
    const payload = req.body;
    const books = await BookModel.findOne({_id:upid})
    let bookID = books._id
    try {
        await BookModel.findByIdAndUpdate({_id:bookID},{title:payload.title,author:payload.author,category:payload.category,price:payload.price,quantity:payload.quantity});
        res.status(201).json({status:201,books,messege:"books has been updated"});
    } catch (error) {
        console.log(error);
        res.send("Not able to update")
    }
})
bookRouter.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    const books = await BookModel.findOne({_id:id});
    try {
        await BookModel.findByIdAndDelete({_id:id})
        res.status(201).json({status:201,books,messege:"books has been deleted"});
    } catch (error) {
        console.log(error);
        res.send("Not able to delete")
    }
})

module.exports={
    bookRouter
}
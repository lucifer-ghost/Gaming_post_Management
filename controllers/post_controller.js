const postModel=require("../models/post_model")

let {v4:uuidv4}=require("uuid")

let addPost=async(req,res)=>{
    try{
        let data=new postModel({...req.body,"_id":uuidv4()})
        await data.save()
        res.json({"msg":"Post saved successfully"})
    }
    catch(err){
        res.json({"msg":"Error in saving post"})
        console.log(err)
    }
}

let getPosts=async(req,res)=>{
    try{
        let data=await postModel.find({"accept":"true"})
        res.json(data)
    }
    catch(err){
        res.json({"msg":"Error in getting posts"})
    }
}

let getByCategory=async(req,res)=>{
    try{
        let data=await postModel.find({"category":req.params.category,"accept":"true"})
        res.json(data)
    }
    catch(err){
        res.json({"msg":"Error in getting posts"})
    }
}

let getDoneByMe=async(req,res)=>{
    try{
        let data=await postModel.find({"uid":req.params.uid})
        res.json(data)
    }
    catch(err){
        res.json({"msg":"Error in getting posts"})
    }
}

let deletePost=async(req,res)=>{
    try{
        await postModel.findByIdAndDelete({"_id":req.params.pid})
        res.json({"msg":"del done"})
    }
    catch(err)
    {
        res.json({"msg":"error in del"})
    }
}

let update=async(req,res)=>{
    try{
        await postModel.findByIdAndUpdate({"_id":req.body._id},{...req.body,"accept":"false"})
        res.json({"msg":"upd done"})
    }
    catch(err){
        res.json({"msg":"error in upd"})
    }
}

let getRPosts=async(req,res)=>{
    try{
     let data=await postModel.find({"accept":"false"})
     res.json(data)
    }
    catch(err){
        res.json({"msg":"error in getting"})
    }
}

let accept=async(req,res)=>{
    try{
        await postModel.findByIdAndUpdate({"_id":req.params.pid},{"accept":"true"})
        res.json({"msg":"accepted"})
    }
    catch(err)
    {
        res.json({"msg":"error in accepting"})
    }
}

let updRv=async(req,res)=>{
    try{
        await postModel.findByIdAndUpdate({"_id":req.body._id},{$push:{"comment":req.body.msg},"accept":"rv"})
        console.log(done)
        res.json({"msg":"done"})
    }
    catch(err){
        res.json({"msg":"error in comment"})
    }
}

module.exports={addPost, getPosts, getByCategory, getDoneByMe, deletePost, update, getRPosts, accept, updRv}
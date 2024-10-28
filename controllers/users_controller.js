const userModel = require("../models/users_model")

let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")

let addUser=async(req,res)=>{
    try{
        let hash=await bcrypt.hash(req.body.password,7)
        let data=new userModel({...req.body,"password":hash})
        await data.save()
        res.json({"msg":"Registration done"})
    }
    catch(err){
        res.json({"msg":"error in registration","err":err})
    }
}

let userLogin=async(req,res)=>{
    try{
        let obj=await userModel.findById({"_id":req.body._id})
        if(obj){
            let f=await bcrypt.compare(req.body.password,obj.password)
            if(f){
                let token=jwt.sign({"_id":obj._id},"abcd")                          
                res.json({"token":token,"_id":obj._id,"name":obj.name,"role":obj.role})
            }
            else{
                res.json({"msg":"Please check your password"})
            }
        }
        else{
            res.json({"msg":"Please check your e-mail"})
        }
    }
    catch{
        res.json({"msg":"error in login"})
    }
}

let isLogin=(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,"abcd")
        next()
    }
    catch{
        res.json({"msg":"Please login first"})
    }
}

module.exports={addUser,userLogin,isLogin}
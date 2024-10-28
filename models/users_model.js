let mongoose=require("mongoose")
let userSchema=new mongoose.Schema(
    {
        "_id":String,
        "name":String,
        "phno":Number,
        "age":Number,
        "password":String,
        "role":{
            type:String,
            default:"user"
        }
    }
)
let userModel=mongoose.model("users",userSchema)
module.exports=userModel
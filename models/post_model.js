let mongoose=require("mongoose")
let postSchema=new mongoose.Schema({
    "_id":String,
    "title":String,
    "category":String,
    "content":String,
    "uid":String,
    "name":String,
    "dop":Date,
    "accept":{
        type:String,
        default:"false"
    },
    "comment":[]
})
let postModel=mongoose.model("post",postSchema)
module.exports=postModel
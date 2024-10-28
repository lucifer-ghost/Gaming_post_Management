const { addPost, getPosts, getByCategory, getDoneByMe, deletePost, update, getRPosts, accept, updRv } = require("../controllers/post_controller")
const { addUser, userLogin, isLogin } = require("../controllers/users_controller")

let express=require("express")
let route=new express.Router()

route.post("/register",addUser)
route.post("/login",userLogin)

route.post("/addpost",addPost)
route.get("/getpost",getPosts)
route.get("/getbycat/:category",getByCategory)
route.get("/getdonebyme/:uid",isLogin,getDoneByMe)
route.delete("/delpost/:pid",isLogin,deletePost)
route.put("/upd",isLogin,update)
route.get("/getrposts",isLogin,getRPosts)
route.get("/accept/:pid",isLogin,accept)
route.put("/updrv",isLogin,updRv)

module.exports=route
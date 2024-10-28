const route = require("./routes/route")

let express=require("express")
let mongoose=require("mongoose")
let cors=require("cors")
let app=express()
const path = require("path");
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Gaming_Post").then(()=>{
    console.log("Connected to server")
}).catch((err)=>{
    console.log(err)
})

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname,"frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));    
});

// app.use("/",route)

app.listen(6969)
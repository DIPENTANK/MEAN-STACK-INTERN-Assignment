var express = require("express");
var mongoose =require('mongoose');
var app=express();  
var bodyParser = require('body-parser');
var cors=require("cors");
// require("./db/conn");
require("../routers/testApi");
// require("../routers/auth");
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

const port=process.env.PORT || 4000;

const DB = 'mongodb+srv://dipen:admin123@cluster0.jimoz.mongodb.net/signup?retryWrites=true&w=majority'
mongoose.connect(DB, {
}).then(()=> {
    console.log(`connection successful`);
}).catch((err)=>{
    console.log(err);
})

var testAPIRouter=require("../routers/testApi");

const res = require("express/lib/response");

app.use("/testApi",testAPIRouter)

app.use(cors());

app.get("/", (req,res) => {
    res.send("hello  dipen")
});


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})


const db = mongoose.connection;

app.post('/register',async(req,res)=>{

    db.once("open", function () {
        console.log("Connected successfully");
      });
    const{email,phone,password}=req.body;

    if(!email || !phone || !password){
        return res.status(422).json({error:"Plz filled the field properly"});
    }

    try{
        const userExit=await db.users.findOne({email:email});

        if(userExit){
            return res.status(422).json({error:"Email already exist"});
        }
        else if(password == 10){
            return res.status(422).json({error:"phone no 10 digit"});
        }
        else{
            const user=new users({email,phone,password});
            await user.save();  
            return res.status(201).json({message:"User successful registered"});
        }
    }
    catch(err){
        console.log(err);
    }
});
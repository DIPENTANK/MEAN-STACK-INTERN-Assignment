const async = require("hbs/lib/async");
const router = require("./testApi");

router.post('/register',async(req,res)=>{

    const{email,phone,password}=req.body;

    if(!email || !phone || !password){
        return res.status(422).json({error:"Plz filled the field properly"});
    }

    try{
        const userExit=await User.findOne({email:email});

        if(userExit){
            return res.status(422).json({error:"Email already exist"});
        }
        else if(password == 10){
            return res.status(422).json({error:"phone no 10 digit"});
        }
        else{
            const user=new User({email,phone,password});
            await user.save();
            return res.status(201).json({message:"User successful registered"});
        }
    }
    catch(err){
        console.log(err);
    }
});
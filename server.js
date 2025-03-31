//importing all required external modules after installation
const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')

//middleware
const PORT=3000
const app=express()
app.use(express.json())

//connecting mongodb atlas
mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("Db connected successfully...")
).catch(
    (err)=>console.log(err)
)

//api landing page http://localhost:3000/
app.get('/',async(req, res)=>{
    try{
        res.send("<h1 align=center>welcome to the backend and week 2</h1>")

    }
    catch(err)
    {
        console.log(err)
    }
})

//Api registration page http://localhost:3000/register

app.post('/register',async(req ,res)=>{
    const {user,email,password}=req.body
    
    try{
        const hashPassword= await bcrypt.hash(password,10)
        const newUser=new User({user,email,password:hashPassword})
         await newUser.save()
         console.log('New user is registered successfully...')
         res.json({message:'User created...'})
    }
    catch(err)
    {
        console.log(err)
    }
})

// Api login page 
app.post('',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password)))
           {
              return res.status(400).json({message:"Invalid Credentials"});
           }
         res.json({message: "Login Successfull", username:user.username});
    }
    catch(err)
    {
        console.log(err)
    }
})


//server running and testing
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("Server is running on port: "+PORT)
}) 

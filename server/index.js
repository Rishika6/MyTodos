const express=require('express');
const cors=require('cors')
const app=express();


const mongoose=require('mongoose');
const User=require('./models/user');
const Todos =require('./models/todos')

mongoose.connect("mongodb://localhost/todo",{useNewUrlParser: true, 
useCreateIndex: true, 
useUnifiedTopology: true});

app.use(cors());
app.use(express.json());
app.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    console.log(username,password);
    //res.send("HELLO WORLD");
   User.findOne({username:username},(err,user)=>{
    if(user){
        res.status(500);
        res.json({
            message:"user already exist"
        })
        return;
    }  

})

  await User.create({username:username,password:password});
    return res.status(200).json({
        messgae:"registered"
    })
    
})

app.post('/todos',async (req,res)=>{
    
    const {authorization}=req.headers;
    const [,token]=authorization.split(" ");
    const [username,password]=token.split(":");
    const todoItems=req.body;
    const user=await User.findOne({username}).exec();
    if(!user||user.password!=password){
        res.status(403);
        res.json({
            message:"Invalid access"
        });
        return ;
    }
    const todos=await Todos.findOne({userId:user._id});
    if(!todos){
       await Todos.create({
           userId:user._id,
           todos:todoItems
       })
    }
    else{
        todos.todos=todoItems;
       await todos.save();
    }
    res.json(todos);
})

app.get('/todos',async (req,res)=>{
    const {authorization}=req.headers;
    const [,token]=authorization.split(" ");
    const [username,password]=token.split(":");
    const todoItems=req.body;
    const user=await User.findOne({username}).exec();
    if(!user||user.password!=password){
        res.status(403);
        res.json({
            message:"Invalid access"
        });
        return ;
    }
    const todos=await Todos.findOne({userId:user._id});
    
    res.json(todos.todos);
})

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    User.findOne({username:username},(err,user)=>{
        if(!user||user.password!=password){
            res.status(500);
            res.json({
                message:"invalid"
      })}
        res.status(200).json({
            message:"login successful"
        })
         
   
    

})
})



app.listen(4000,()=>{
    console.log("app running at 4000");
})

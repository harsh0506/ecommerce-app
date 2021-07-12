const { response } = require('express');
const express = require('express');
const path = require('path');

const userSchema = require('./module/module')
const app = express();
app.use(express.json())

app.use(express.urlencoded({ extended : false }))
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname , "/public/index.html"))
})
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname , "/public/home.html"))
})
app.get("/datafromclient",(req,res)=>{
    console.log(req.body)
})
app.get('/seller',(req,res)=>{
    res.sendFile(path.join(__dirname , "/public/seller.html"))
})
app.get("/datat",(req,res)=>{
    userSchema.find({},(err,data)=>{
        if(err){
            response.status(404).send("error has occuerd",err)
        }
        res.json(data)
    })
})
app.post("/infotech",async(req,res)=>{
    try{
        const item = req.params.id;
        const datafound = await userSchema.findById(item,req.body)
        res.send(datafound)
        console.log(datafound)
    }catch(err){
res.status(404).send("error occured")
    }
    
})
app.delete('/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const userdata = await userSchema.findByIdAndDelete(_id,req.body)
        
    }catch(err){

    }
})
app.get('/data',(req,res)=>{
    res.sendFile(path.join(__dirname , "/public/data.json"))
})
app.post('/seller',(req,res)=>{
    let car = new userSchema(req.body);
   car.save()
   res.redirect("/")
})
app.listen(3000,()=>{
    console.log("listening at port 3000")
})
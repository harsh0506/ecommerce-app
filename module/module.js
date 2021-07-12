const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usersdata',{
     useNewUrlParser: true ,
     useUnifiedTopology: true 
})
.then(()=>{
    console.log("db is connected")
})
.catch(err =>{
    console.log('the error is ',err)
})
const users = new mongoose.Schema(
    {
        Prodname : String,
        Price : String,
        ImageUrl : String
    }
);
const UserSchema = new mongoose.model('ecomdata',users)
module.exports=UserSchema;
const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    user:{type:String,requiired:true},
    email:{type:String,requiired:true},
    password:{type:String,requiired:true},

})

module.exports=mongoose.model('User',UserSchema)
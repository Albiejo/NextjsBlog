import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';


const adminSchema = mongoose.Schema(
    {
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    }  , {
        timestamps:true
    });
    
    


adminSchema.pre('save' , async function(next){
        if(!this.isModified('password')){
            next();
        }
    
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt)
});    




adminSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}
    



const Admin = mongoose.model('admin' , adminSchema)

export default Admin
const mongoose=require("mongoose");

const Schema= new mongoose.Schema({
    address:
    {type:String,
    
    },
    authorityName:{
        type:String,
    },
    city:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    lastVerified:{
        type:Date,
        default:new Date()
    }
});

const Plasma=mongoose.model("plasma",Schema);
const Oxygen=mongoose.model("oxygen",Schema);
const Hospitals=mongoose.model("hospitals",Schema);
const BloodBank=mongoose.model("bloodBank",Schema);

module.exports={Plasma,Oxygen,Hospitals,BloodBank};

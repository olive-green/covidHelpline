const express=require("express")
const mongoose=require("mongoose")
var router=express.Router();
const {Plasma}=require("../models/schema.js");
const {BloodBank}=require("../models/schema.js");
const {Hospitals}=require("../models/schema.js");
const {Oxygen}=require("../models/schema.js");

//post request for oxygen page
router.post("/oxygen",async (req,res)=>{
    let oxygen= new Oxygen({
        authorityName:req.body.authority,
        address:req.body.address,
        city:req.body.city,
        contact:req.body.contact,
        lastVerified:new Date()
    });
    try{
        console.log(oxygen);
        oxygen=await oxygen.save();

        res.redirect("/oxygen");
    }
    catch(err){
        console.log(err)
        res.render("/oxygen",{oxygen:oxygen});
    }
})
//post request for plasma page
router.post("/plasma",async (req,res)=>{
    let plasma= new Plasma({
        address:req.body.address,
        authorityName:req.body.authority,
        city:req.body.city,
        contact:req.body.contact,
        lastVerified:new Date()
    });
    try{
        plasma=await plasma.save();
        res.redirect("/plasma");
    }
    catch(err){
        console.log(err)
        res.render("/plasma",{plasma:plasma});
    }
})
//post request for oxygen page
router.post("/bloodBank",async (req,res)=>{
    let bloodBank= new BloodBank({
        address:req.body.address,
        authorityName:req.body.authority,
        city:req.body.city,
        contact:req.body.contact,
        lastVerified:new Date()
    });
    try{
        bloodBank=await bloodBank.save();
        res.redirect("/bloodBank");
    }
    catch(err){
        console.log(err)
        res.render("/bloodBank",{bloodBank:bloodBank});
    }
})
//post request for hospitals page
router.post("/hospitals",async (req,res)=>{
    let hospitals= new Hospitals({
        address:req.body.address,
        authorityName:req.body.authority,
        city:req.body.city,
        contact:req.body.contact,
        lastVerified:new Date()
    });
    try{
        hospitals=await hospitals.save();
        res.redirect("/hospitals");
    }
    catch(err){
        console.log(err)
        res.render("/hospitals",{hospitals:hospitals});
    }
});



module.exports=router;

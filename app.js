const express=require("express")
const app=express()
const mongoose=require("mongoose");
const port= process.env.PORT || 3000;
const methodOverride=require("method-override");
const resourcesRouter=require("./routes/resources.js");
const {Plasma}=require("./models/schema.js");
const {BloodBank}=require("./models/schema.js");
const {Hospitals}=require("./models/schema.js");
const {Oxygen}=require("./models/schema.js");
//setting ejs template
app.set("view engine","ejs");

// user:photon
// password:gKvkkkktZjg6PebF
//connect database
mongoose.connect("mongodb+srv://photon:gKvkkkktZjg6PebF@cluster0.82akh.mongodb.net/covidHelpline?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("database connected successfully"))
.catch((err)=>console.log(err))



//middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"))
app.use("/resources",resourcesRouter);


//home page
app.get("/",(req,res)=>{
    res.render("index");
});

//hospitals page
app.get("/hospitals",async(req,res)=>{
    const hospitals=await Hospitals.find().sort({lastVerified: -1});
    let title="Hospitals";
    res.render("hospitals",{hospitals:hospitals,title:title});
})
//plasma page
app.get("/plasma",async(req,res)=>{
    const plasma=await Plasma.find()
    let title="Plasma";
    res.render("plasma",{plasma:plasma,title:title});
})
//bloodBank page
app.get("/bloodBank",async(req,res)=>{
    const bloodBank=await BloodBank.find()
    let title="Blood Bank"
    res.render("bloodBank",{bloodBank:bloodBank,title:title});
})
//oxygen page
app.get("/oxygen",async(req,res)=>{
    const oxygen=await Oxygen.find()
    let title="Oxygen"
    res.render("oxygen",{oxygen:oxygen,title:title});
})

//Oxygen admin page
app.get("/oxygen-admin",async(req,res)=>{
    const oxygen=await Oxygen.find()
    res.render("oxygenAdmin",{oxygen:oxygen});
})
//Plasma admin page
app.get("/plasma-admin",async(req,res)=>{
    const plasma=await Plasma.find();
    res.render("plasmaAdmin",{plasma:plasma});
})
//Hospitals admin page
app.get("/hospitals-admin",async(req,res)=>{
    const hospitals=await Hospitals.find();
    res.render("hospitalsAdmin",{hospitals:hospitals});
})
//BloodBank admin page
app.get("/bloodbank-admin",async(req,res)=>{
    const bloodBank=await BloodBank.find();
    res.render("bloodBankAdmin",{bloodBank:bloodBank});
})


// bloodbank edit route
app.get("/bloodbank-admin/edit/:id",async(req,res)=>{
    const  bloodBank=await BloodBank.findById(req.params.id);
    // console.log(bloodBank)
    res.render("forms/bloodBankForm",{bloodBank:bloodBank});
})
//bloodbank edit save route
app.put("/bloodbank-admin/edit/:id",async(req,res)=>{
    req.bloodBank =await BloodBank.findById(req.params.id);
    let bloodBank= req.bloodBank
        bloodBank.address=req.body.address
        bloodBank.authorityName=req.body.authority
        bloodBank.city=req.body.city
        bloodBank.contact=req.body.contact
        bloodBank.lastVerified=req.body.lastVerified
    
    try{
        bloodBank=await bloodBank.save();
        res.redirect("/bloodBank-admin");
    }
    catch(err){
        console.log(err)
        res.render("/bloodbank-admin/edit/:id",{bloodBank:bloodBank});
    }
});
//blood bank new lead get route
app.get("/bloodbankForm",(req,res)=>{
    res.render("forms/bloodBankForm",{bloodBank: new BloodBank()});
})


// oxygen edit route
app.get("/oxygen-admin/edit/:id",async(req,res)=>{
    const  oxygen=await Oxygen.findById(req.params.id);
    // console.log(bloodBank)
    res.render("forms/oxygenForm",{oxygen:oxygen});
})
//oxygen edit save route
app.put("/oxygen-admin/edit/:id",async(req,res)=>{
    req.oxygen =await Oxygen.findById(req.params.id);
    let oxygen= req.oxygen
    oxygen.address=req.body.address
    oxygen.authorityName=req.body.authority
    oxygen.city=req.body.city
    oxygen.contact=req.body.contact
    oxygen.lastVerified=req.body.lastVerified
    
    try{
        oxygen=await oxygen.save();
        res.redirect("/oxygen-admin");
    }
    catch(err){
        console.log(err)
        res.render("/oxygen-admin/edit/:id",{oxygen:oxygen});
    }
});

//oxygen new lead get route
app.get("/oxygenForm",(req,res)=>{
    res.render("forms/oxygenForm",{oxygen: new Oxygen()});
})


// hospitals edit route
app.get("/hospitals-admin/edit/:id",async(req,res)=>{
    const  hospitals=await Hospitals.findById(req.params.id);
    // console.log(bloodBank)
    res.render("forms/hospitalsForm",{hospitals:hospitals});
})
//hospitals edit save route
app.put("/hospitals-admin/edit/:id",async(req,res)=>{
    req.hospitals =await Hospitals.findById(req.params.id);
    let hospitals= req.hospitals
    hospitals.address=req.body.address
    hospitals.authorityName=req.body.authority
    hospitals.city=req.body.city
    hospitals.contact=req.body.contact
    hospitals.lastVerified=req.body.lastVerified
    
    try{
        hospitals=await hospitals.save();
        res.redirect("/hospitals-admin");
    }
    catch(err){
        console.log(err)
        res.render("/hospitals-admin/edit/:id",{hospitals:hospitals});
    }
});

//hospitals new lead get route
app.get("/hospitalsForm",(req,res)=>{
    res.render("forms/hospitalsForm",{hospitals: new Hospitals()});
})


// plasma edit route
app.get("/plasma-admin/edit/:id",async(req,res)=>{
    const  plasma=await Plasma.findById(req.params.id);
    // console.log(bloodBank)
    res.render("forms/plasmaForm",{plasma:plasma});
})
//plasma edit save route
app.put("/plasma-admin/edit/:id",async(req,res)=>{
    req.plasma =await Plasma.findById(req.params.id);
    let plasma= req.plasma
    plasma.address=req.body.address
    plasma.authorityName=req.body.authority
    plasma.city=req.body.city
    plasma.contact=req.body.contact
    plasma.lastVerified=req.body.lastVerified
    
    try{
        plasma=await plasma.save();
        res.redirect("/plasma-admin");
    }
    catch(err){
        console.log(err)
        res.render("/plasma-admin/edit/:id",{plasma:plasma});
    }
});

//plasma new lead get route
app.get("/plasmaForm",(req,res)=>{
    res.render("forms/plasmaForm",{plasma: new Plasma()});
})



// All delete routes
app.delete("/hospitals-admin/delete/:id",async(req,res)=>{
    await Hospitals.findByIdAndDelete(req.params.id);
    res.redirect("/hospitals-admin");
})
app.delete("/bloodbank-admin/delete/:id",async(req,res)=>{
    await BloodBank.findByIdAndDelete(req.params.id);
    res.redirect("/bloodbank-admin");
})
app.delete("/oxygen-admin/delete/:id",async(req,res)=>{
    await Oxygen.findByIdAndDelete(req.params.id);
    res.redirect("/oxygen-admin");
})
app.delete("/plasma-admin/delete/:id",async(req,res)=>{
    await Plasma.findByIdAndDelete(req.params.id);
    res.redirect("/plasma-admin");
})

//server connection
app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
})

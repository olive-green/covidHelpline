const express=require("express")
const app=express()
const mongoose=require("mongoose");
const port= process.env.PORT || 3000;
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

app.use("/resources",resourcesRouter);


//home page
app.get("/",(req,res)=>{
    res.render("index");
});


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

//hospitals page
app.get("/hospitals",async(req,res)=>{
    const hospitals=await Hospitals.find()
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

//saving data to database


//server connection
app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
})
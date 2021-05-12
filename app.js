const express=require("express")
const app=express()
const mongoose=require("mongoose");
const port= process.env.PORT || 3000;
//setting ejs template
app.set("view engine","ejs");

// user:photon
// password:gKvkkkktZjg6PebF
//connect database
// mongoose.connect("mongodb+srv://photon:gKvkkkktZjg6PebF@cluster0.82akh.mongodb.net/covidHelpline?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
// .then(()=>console.log("database connected successfully"))
// .catch((err)=>console.log(err))

//middleware
app.use(express.static("public"));

//home page
app.get("/",(req,res)=>{
    res.render("index");
});

//admin page
app.get("/adm",(req,res)=>{
    res.render("admin");
})

//hospitals page
app.get("/hospitals",(req,res)=>{
    let title="Hospitals";
    res.render("hospitals",{title:title});
})
//plasma page
app.get("/plasma",(req,res)=>{
    let title="Plasma";
    res.render("plasma",{title:title});
})
//hospitals page
app.get("/bloodBank",(req,res)=>{
    let title="Blood Bank"
    res.render("bloodBank",{title:title});
})
//hospitals page
app.get("/oxygen",(req,res)=>{
    let title="Oxygen"
    res.render("oxygen",{title:title});
})

//server connection
app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
})
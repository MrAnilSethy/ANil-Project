const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let dataBase= [
    {
        id:uuidv4(),
        username:"anil",
        about:"hey i am a student",
    },
    {
        id:uuidv4(),
        username:"sunil",
        about:"hey i am working professional",

    },
    {
        id:uuidv4(),
        username:"babu",
        about:"hey i am live at village",
    },
]
app.get("/twits",(req,res)=>{
    res.render("index.ejs",{dataBase});
});
app.get("/twits/new",(req,res)=>{
    res.render("form.ejs");
});
app.post("/twits",(req,res)=>{
    let {username,about} = req.body;
    let id = uuidv4();
    dataBase.push({id,username,about});
    res.redirect("/twits");
});
app.get("/twits/:id",(req,res)=>{
      let {id} = req.params;
      let data = dataBase.find((m)=> id === m.id);
      res.render("show.ejs",{data});
});
app.get("/tiwts/:id/edit",(req,res)=>{
     let {id} = req.params;
     let data = dataBase.find((m)=> id === m.id);
     res.render("edit.ejs",{data});
})
app.patch("/twits/:id",(req,res)=>{

})
app.listen(port,()=>{
    console.log("listing on port",port);
});
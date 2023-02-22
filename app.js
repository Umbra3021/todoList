const express= require("express");
const bodyPaser =require("body-parser");
const app =express();
let items=[];
let workitems=[];
app.set('view engine', 'ejs');
app.use(bodyPaser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.get("/",function(req,res){
    var day="";
    var today=new Date();
    var options={
        weekday:"long",
        day:"numeric",
        month:"long" 
    };
    var day=today.toLocaleDateString("en-US",options);
    res.render("lists",{ex1: day, newList: items});  

});

app.post("/",function(req,res){
    let item =req.body.newItem;
    console.log(req.body);
    if(req.body.list=="Worklist"){
        workitems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/")
    }

});

app.get("/work",function(req,res){
    res.render("lists",{ex1:"Worklist",newList:workitems});
});

app.listen(3000,function(){
    console.log("Server started");
}); 

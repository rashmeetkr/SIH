var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require("body-parser");
var source=110034;
var destination=110078;
var price=0;
var weight;
var distance;
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

var cno;
var url=" http://postalpincode.in/api/pincode/" + String(110023);
    request(url,function(error,response,body){
    if(!error && response.statusCode ==200 )
    {
    	//Things worked
    	//console.log(body);
    	var parsedData = JSON.parse(body);
    	//console.log(parsedData["PostOffice"]);
    	data_postoffice = parsedData["PostOffice"];
    }
    });

app.get("/",function(req,res){
    res.render("index");
});
app.get("/find_pincode",function(req,res){
    res.render("find_pincode");
});
app.get("/calculate_postage",function(req,res){
    res.render("calculate_postage",{price:price});
});
app.post("/calculate_postage",function(req,res){
    source = req.body.source_pincode;
    destination = req.body.destination_pincode;
    weight = req.body.weight;
    console.log(req.body);
    //var url ="https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + String(source) +"&destinations=" +String(destination) + "&key=AIzaSyBCi76ZQ4pFE7RVbHgPtYZ3qIPwfCo8T4M";
   var source1 = String(source);
   var destination1 = String(destination);
   var url ="https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + source1 +"&destinations=" +destination1 + "&key=AIzaSyBCi76ZQ4pFE7RVbHgPtYZ3qIPwfCo8T4M";
    request(url,function(error,response,body){
    if(error)
    {
    	console.log("Something went wrong!");
    	console.log(error);
    }
    else if(response.statusCode ==200 )
    {
    	//Things worked
    	var parsedData = JSON.parse(body);
    	//Distance
    	//console.log(parsedData["rows"][0]["elements"][0]["distance"]["value"]);
    	distance = parsedData["rows"][0]["elements"][0]["distance"]["value"];

    }
    price = weight*distance/10000;
    console.log(price);
 
});
   res.redirect("/calculate_postage");
});
app.get("/track_consignment",function(req,res){
    res.render("track_consignment");
});
app.get("/track_consignment2",function(req,res){
    if(cno == '12345'){
    res.render("display_consignment",{cno:cno});
    }
    else{
    res.render("track_consignment");
    }
});
app.post("/track_consignment",function(req,res){
    cno = req.body.cno;
    console.log(req.body);
    res.redirect("/track_consignment2");
});
app.get("/track_postoffice",function(req,res){
    res.render("track_postoffice");
});
//app.get("/display_postoffice",function(req,res){

  //  res.render("display_postoffice",{data_postoffice:data_postoffice});
//});
app.post("/track_postoffice",function(req,res){
    var pincode = req.body.pincode;
    var url=" http://postalpincode.in/api/pincode/" + String(pincode);
    request(url,function(error,response,body){
    if(!error && response.statusCode ==200 )
    {
    	//Things worked
    	//console.log(body);
    	var parsedData = JSON.parse(body);
    	//console.log(parsedData["PostOffice"]);
    	data_postoffice = parsedData["PostOffice"];
    }
    });
   //res.redirect("/display_postoffice");
    res.render("display_postoffice",{data_postoffice:data_postoffice});
});

app.listen(7400,function(){
    console.log("running....");
});


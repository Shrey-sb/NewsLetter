const express= require("express");
const bodyParse = require("body-parser");
const request = require("request");
const https = require("https");
const app= express();
require('dotenv').config()
app.use(bodyParse.urlencoded({extended :true}));

app.use(express.static("public"));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req, res){
const aa = req.body.s1;
const bb = req.body.s2;
const cc = req.body.s3;
  const data = {
    members : [
      {
        email_address: cc,
        status: "subscribed",
        merge_field:{
          FNAME: aa,
          LNAME: bb
        }
      }
    ]

  };

  var jsondata = JSON.stringify(data);
const url = "https://us1.api.mailchimp.com/3.0/lists/1aec2b6c8b";



const options = {
  method : "POST",
  auth : process.env.apikey
}

const request=  https.request(url,options,function(response){

  if(response.statusCode === 200){
    res.sendFile(__dirname +"/success.html");
  }else{
    res.sendFile(__dirname +"/failure.html");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();
})
app.post("/failure",function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
})

//51c8bd759f6d1912c7e94877fc4564bb-us1
// 1aec2b6c8b

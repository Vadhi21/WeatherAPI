const express = require("express");
const bodyParser = require("body-parser");
const https =  require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});





app.post("/",function(req,res){
  const city = req.body.cityName;
  const apikey = "727580f19679c8d7ace30b591f3d1d94";
  const unit = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&appid="+ apikey + "&units="+ unit;

  https.get(url,function(response){

    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data); //the response is turned into a javascript object
      const description = weatherData.weather[0].description;
      const temp = weatherData.main.temp; //use json awesome to get access to the required element in the object
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";

      res.setHeader('Content-type','text/html');
    res.write("<img src="+imageURL+">");
    res.write("<h2>The weather is: "+description+"</h2>")
    res.write("<h2>The temperature is: "+temp+" degree celsius</h2>");
    res.send();

      console.log(description+" "+ "Temperature is: "+temp);
        console.log("The post request received successfully!");
    })
  });
  console.log(req.body.cityName);
});
app.listen(3000,function(){
  console.log("Server is up and running on port 3000");
});

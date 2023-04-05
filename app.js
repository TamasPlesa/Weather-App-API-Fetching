const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res)=> {


    const query = req.body.cityName
const apiKey = "719607ea37ec81d70e27319027d2256e"
const unit = "metric"
const url =
"https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
https.get(url, function (response) {
console.log(response.statusCode);

response.on("data", function (data) {
  const weatherData = JSON.parse(data);
  const temperature = weatherData.main.temp;
  const description = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  res.write(
    "<h1>The temperature in " + query + "is " + temperature + " celsius.</h1>"
  );
  res.write("<h1>The weather has " + description + "</h1>");
  res.write("<img src=" + imageUrl + ">");
  res.send();
});
});
})


app.listen(3000, () => {
  console.log("Server is runing on port 3000");
});

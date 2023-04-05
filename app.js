const express = require("express")
const https = require("https")

const app = express()

app.get("/", (req, res)=> {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Budapest&appid=719607ea37ec81d70e27319027d2256e&units=metric"
    https.get(url, function(response) {
        console.log(response.statusCode)

    response.on("data", function(data) {
        const weatherData = JSON.parse(data)
        const temperature = weatherData.main.temp
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<h1>The temperature in london is " + temperature + " celsius.</h1>")
        res.write("<h1>The weather has " + description + "</h1>")
        res.write("<img src=" + imageUrl + ">")
        res.send()

    })
    })
})






app.listen(3000, ()=> {
    console.log("Server is runing on port 3000")
})
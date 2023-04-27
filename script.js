const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const https = require('https')
const { log } = require('console')


app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req,res) {
   res.sendFile(__dirname + '/index.html')
  
})

app.post ("/", function(req,res) {
   const cityName = req.body.cityName;
   const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=9a190ec2fe5171fcbd0db8b97a2838ec`;
   https.get ( geoUrl, function(response) {
      console.log(response.statusCode)
      response.on ( 'data' ,function(data) {
         const prs = JSON.parse(data)
         const lat = prs[0].lat
         const lon = prs[0].lon
         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9a190ec2fe5171fcbd0db8b97a2838ec&units=metric`
            https.get(url, function(response) {
               response.on('data', function(data){
                  const parsUrl = JSON.parse(data)
                  const icon = parsUrl.weather[0].icon
                  const imgUrl = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'



                  res.write("<h1>TOKYO</h1>")
                  res.write("TEMP:"+parsUrl.main.temp)
                  res.write('<img src='+imgUrl+'>')
                  res.send()
               })
            })
      })
     
   });

   

   
 
})



app.listen(3000, function() {
   console.log( " SERVER STARTED")
})
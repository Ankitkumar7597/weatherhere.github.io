const router = require('express').Router()


router.get('/', (req, res) => {
    const senddata={location:"Location",country:"Country",temp:"Temp",disc:"Description",feel:"Feel-like",humidity:"Humidity",speed:"Wind Speed",img:""}
    res.render('index.ejs',{senddata: senddata})
})


router.post('/', async (req, res) => {
    let location=(req.body.city)
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=metric`
    const respone= await fetch(url)
    const weatherData= await respone.json()

    const temp=Math.floor(weatherData.main.temp)
    const disc=weatherData.weather[0].description
    const icon=weatherData.weather[0].icon
    const imgurl=`https://openweathermap.org/img/wn/${icon}@2x.png`
    const senddata={};

    senddata.temp=temp
    senddata.disc=disc
    senddata.location=location
    senddata.country=weatherData.sys.country
    senddata.feel=weatherData.main.feels_like
    senddata.humidity=weatherData.main.humidity
    senddata.speed=weatherData.wind.speed
    senddata.img=imgurl
    res.render('index.ejs',{senddata: senddata})
})


module.exports = router
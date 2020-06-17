var express = require('express');
var router = express.Router();
const getGeocode = require("../utils/getGeocode")
const getForecast = require("../utils/getForecast")

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const { city } = req.query
    console.log(req.query)
    if (!city) {
      return res.render('index', { title: 'Another Weather Forecast Nobody Asks For' });
    } // else
    // get the cordinates from city
    const location = await getGeocode(city)
    console.log(location)
    //use the location coords to get the forecast
    //get coords from location.geometry.coordinaqtes
    const forecast = await getForecast(location.geometry.coordinates[0], location.geometry.coordinates[1])
    console.log(forecast.current.weather[0].icon)
    // const every3hours = []
    // let count = 0;

    const every2hours = forecast.hourly.filter((item, idx) => { 
      if (idx % 3 === 0 && idx < 24) {return item}
    })

    // const oneday =  forecast.hourly
    // for (i=0; i < forecast.hourly.length; i++){
     
    //   if (count=== 0) every3hours.push(forecast.hourly[i])
    //   count+=1
    //   if (count ===3) { count = 0 }
    // // }
    // console.log(every3hours.length)
    // console.log(forecast)
    return res.render('index', {
      title: 'Another Weather Forecast Nobody Asks For',
      icon: forecast.current.weather[0].icon,
      forecast: forecast.current,
      city: location.text,
      hourly: every2hours
    });


  } catch (err) {
    next(err)
  }
  // console.log(process.env.MAPBOX_KEY)

  // get the city value


});

module.exports = router;

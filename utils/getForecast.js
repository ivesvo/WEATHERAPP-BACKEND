const axios = require('axios');


const getForecast = async(lon,lat)=>{
    // console.log(lat)
    try{
        const token = process.env.APIKEY
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
        exclude={minutely,daily}&appid=${token}&units=metric`
        // console.log(lat,lon)
        const res = await axios.get(url)
        console.log(res.data)
        return res.data

    }catch (err){
        throw err

    }

}

module.exports = getForecast
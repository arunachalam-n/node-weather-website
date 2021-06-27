const request = require('postman-request')

const forecast = (lat,long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5716409f3710234edc81dd710afa2f4e&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=f`;

    request({url:url,json:true},(error,response,body)=>{
        const data = body.current 
        if(error){
            callback(error.message, undefined)
        } else if(response.body.error){
            callback('Unable to find Location',undefined)
        } else{
            callback(undefined,`Weather Description: ${data.weather_descriptions[0]} \n, 
                        WindSpeed : ${data.wind_speed} \n,
                        WindDegree: ${data.wind_degree} \n,
                        WindDirection: ${data.wind_dir} \n,
                        Humidity: ${data.humidity} \n,
                        Cloudcover: ${data.cloudcover} \n,
                        Visibilty: ${data.visibility} \n,
                        Is_Day: ${data.is_day} `)
        }
    });
}

module.exports = forecast;
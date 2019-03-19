const http = require('http')
const config = require('./config').accuweather

const accu = {
    ...config,
    domain: 'http://dataservice.accuweather.com/'
}

module.exports = async function getCurrentConditions() {

    const [
        location, 
        conditions
    ] = await Promise.all([
        request(`locations/v1/${accu.locationKey}?apikey=${accu.apiKey}&language=${accu.languageCode}`),
        request(`currentconditions/v1/${accu.locationKey}?apikey=${accu.apiKey}&language=${accu.languageCode}&details=true`)
    ])

    if('Code' in conditions)
        return({
            cityName: conditions.Message,
            temperature: '-',
            weatherText: '-',
            realfeel: '-',
            icon: 'default'
        })

    else
        return({
            cityName: location.LocalizedName,
            temperature: conditions[0].Temperature.Metric.Value,
            weatherText: conditions[0].WeatherText,
            realfeel: conditions[0].RealFeelTemperature.Metric.Value,
            icon: conditions[0].WeatherIcon
        })
    
}

function request(url) {
    
    return new Promise((resolve, reject) => {
        let requestUrl = accu.domain + url

        http.get(requestUrl, (resp) => {

            let data = ''
        
            resp.on('data', (chunk) => {

            data += chunk

            })
        
            resp.on('end', () => {
                resolve(JSON.parse(data))
            })
        
        }).on("error", (err) => {
            reject(err.message)
        })
    })

}

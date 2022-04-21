const axios = require('axios')
const fs = require('fs')

class Searches{
    
    history =  []
    dbPath = 'db/database.json'
    
    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeatherMap(){
        return {
            'appid': process.env.OPENWEATHER,
            'lang': 'es',
            'units': 'metric'
        }
    }

    get historyPretty(){
        return this.history.map( place => {
            return place.split(' ').map( word => {
                return word.charAt(0).toUpperCase() + word.slice(1)                
            }).join(' ')
        })
    }

    constructor(){
        this.readDB()
    }

    async city( place = ''){        
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })  
            const answer = await instance.get()
            return answer.data.features.map(element => ({
                id: element.id,
                place: element.place_name,
                lon: element.center[1],
                lat: element.center[0]
            }));    
        }catch(err){
            console.log('Something go wrong')
        }
        return []
    } 

    async weather( lat, lon ){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeatherMap, lat, lon }
            })
            const answer = await instance.get()
            return {
                desc: answer.data.weather[0].description,
                temp: answer.data.main.temp,
                min: answer.data.main.temp_min,
                max: answer.data.main.temp_max
            }
        } catch (error) {
            console.log(error)
        }
    }

    addToHistory( place = ''){
        this.history = this.history.filter( el => el != place )
        this.history.unshift( place.toLocaleLowerCase() )

        this.writeDB()
    }

    writeDB(){
        const payload = {
            history: this.history
        }

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) )
    }

    readDB(){
        if ( !fs.existsSync( this.dbPath ) ) return

        const {history} = JSON.parse( fs.readFileSync( this.dbPath, { encoding: 'utf-8' } )) 
        this.history = history
    }
}

module.exports = Searches
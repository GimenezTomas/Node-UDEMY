const { inquirerMenu, setQuestionsHome, pauseMSG, readInput, listPlaces } = require('./helpers/inquirer')
const Searches = require('./models/Searches')
require('dotenv').config({path:'./TOKENS.env'})

const main = async() => {
    let opt
    let searches = new Searches()
    
    while(opt != 0){
        setQuestionsHome()
        opt = await inquirerMenu()

        switch(opt){
            case 1:
                const name_place = await readInput('City: ') 
                const places = await searches.city(name_place)
                const id = await listPlaces(places)

                if (id == 0) continue //continue Termina la ejecución de las sentencias de la iteración actual del bucle actual o la etiqueta y continua la ejecución del bucle con la próxima iteración.

                const place = await places.find(place => id == place.id)
                
                searches.addToHistory( place.place )

                const weather = await searches.weather(place.lat, place.lon)

                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad: ' + place.place)
                console.log('Lat:' + place.lat)
                console.log('Lon: '+ place.lon)
                console.log('Temperatura: ' + weather.temp)
                console.log('Min: ' + weather.min)
                console.log('Max: ' + weather.max)
                console.log('Description: ' + weather.desc)
                break
            case 2:
                searches.historyPretty.forEach( ( el, i ) => {
                    console.log( (i+'').green + ' ' + el)   
                })

                break
        }

        await pauseMSG()
    }
}

main()
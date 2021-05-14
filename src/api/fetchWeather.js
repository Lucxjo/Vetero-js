import axios from 'axios';
import config from '../config.json'

let OWM_API = (config.release) ? require("./secrets.json").owm_api : process.env.OWM_API
    

const URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: OWM_API
        }
    });

    return data
}
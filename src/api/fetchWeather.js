import axios from 'axios';
import secrets from './secrets.json'

const URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: secrets.owm_api
        }
    });

    return data
}
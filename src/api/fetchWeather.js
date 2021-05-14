import axios from 'axios';

const OWM_API = process.env.OWM_API || require("./secrets.json").owm_api;

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
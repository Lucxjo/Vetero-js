import React, { useState } from 'react';
import moment from 'moment';
import { fetchWeather } from './api/fetchWeather'
import './app.css'

const App = () => {

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    const search = async (e) => {
        if (e.key === "Enter") {
            const data = await fetchWeather(query)
            setWeather(data)
            setQuery("")
        } 
    }

    return (
        <div className="main-container">
            <input type="text" className="search" placeholder="Enter a location..." value = {query} onChange = {(e) => setQuery(e.target.value)} onKeyPress = {search} />
            { weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>

                    <div className="city-temp">
                        {Math.round(weather.main.temp * 10) / 10}
                        <sup>&deg;C</sup>
                    </div>

                    <div className="city-feel">
                        Feels like: {Math.round(weather.main.feels_like)}
                        <sup>&deg;C</sup>
                    </div>

                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div> 

                    <div className="detail">
                        <div className="detail-temp">
                            <div className="detail-temp-max detail-left">
                                <p>Max temp</p>
                                <p>
                                    {weather.main.temp_max}
                                    <sup>&deg;C</sup>
                                </p>
                            </div>
                            <div className="detail-temp-min detail-right">
                                <p>Min temp</p>
                                <p>
                                    {weather.main.temp_min}
                                    <sup>&deg;C</sup>
                                </p>
                            </div>
                        </div>
                        <div className="detail-other">
                            <div className="detail-other-pressure detail-left">
                                <p>Pressure</p>
                                <p>
                                    {weather.main.pressure}
                                    <sup>hPa</sup>
                                </p>
                            </div>
                            <div className="detail-other-humidity detail-right">
                                <p>Humidity</p>
                                <p>
                                    {weather.main.humidity}
                                    <sup>%</sup>
                                </p>
                            </div>
                        </div>
                        <div className="detail-sun">
                            <div className="detail-sun-rise detail-left">
                                <p>Sunrise</p>
                                <p>
                                    {moment.unix(weather.sys.sunrise).format('HH:mm:ss')}
                                </p>
                            </div>
                            <div className="detail-sun-set detail-right">
                                <p>Sunset</p>
                                <p>
                                    {moment.unix(weather.sys.sunset).format('HH:mm:ss')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App;
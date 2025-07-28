import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInformation from "./components/WeatherInformations/WeatherInformations";
import WeatherInformations5day from "./components/WeatherInformations5day/WeatherInformations5day";

function App() {
  const [weather, setWeather] = useState();
  const [weather5day, setWeather5day] = useState();
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "90660465d83805939a7d081f4e434d86";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt&units=metric`;
    const url5Day = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt&units=metric`;

    const apiInfo = await axios.get(url);
    const apiInfo5Day = await axios.get(url5Day);

    setWeather5day(apiInfo5Day.data)
    setWeather(apiInfo.data);
  }

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformation weather={weather} />}
      {weather5day && <WeatherInformations5day weather5day={weather5day}/>} 
    </div>
  );
}

export default App;
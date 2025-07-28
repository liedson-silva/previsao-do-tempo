import "./WeatherInformations5day.css";

function WeatherInformations5day({ weather5day }) {
  console.log(weather5day);

  // Agrupar todas as previsões por data
  const groupedForecasts = {};

  for (let forecast of weather5day.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!groupedForecasts[date]) {
      groupedForecasts[date] = [];
    }

    groupedForecasts[date].push(forecast);
  }

  // Criar uma previsão diária com mínima e máxima reais
  const dailyForecast = Object.entries(groupedForecasts).map(
    ([, forecasts]) => {
      const minTemps = forecasts.map((f) => f.main.temp_min);
      const maxTemps = forecasts.map((f) => f.main.temp_max);

      return {
        dt: forecasts[0].dt, // usa a primeira previsão como base para a data
        weather: forecasts[0].weather, // usa o primeiro ícone e descrição
        main: {
          temp_min: Math.min(...minTemps),
          temp_max: Math.max(...maxTemps),
        },
      };
    }
  );

  const next5dayForecast = dailyForecast.slice(0, 5);

  function convertDate(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
    });
    return newDate;
  }

  return (
    <div className="weather-container">
      <h3>Previsão próximos 5 dias</h3>
      <div className="weather-list">
        {next5dayForecast.map((forecast) => (
          <div key={forecast.dt} className="weather-item">
            <p className="forecast-day">{convertDate(forecast)}</p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description}
            />
            <p className="forecast-description">
              {forecast.weather[0].description}
            </p>
            <p>
              {Math.round(forecast.main.temp_min)}°C min /{" "}
              {Math.round(forecast.main.temp_max)}°C máx
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInformations5day;
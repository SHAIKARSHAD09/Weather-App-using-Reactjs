import { useState } from 'react';
import './App.css';

function App() {
	const [city, setCity] = useState('');
	const [weatherInfo, setWeatherInfo] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	function getWeather() {
		const apiKey = '45bc68961e69bc60e993bf8a837b64fb';
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

		setLoading(true);
		setError('');

		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error('City not found');
				}
				return response.json();
			})
			.then((data) => {
				const MT = Math.round(data.main.temp);
				const FL = Math.round(data.main.feels_like);

				const weather = {
					location: `Weather in ${data.name}`,
					temperature: `Temperature: ${MT} °C`,
					feelsLike: `Feels Like: ${FL} °C`,
					humidity: `Humidity: ${data.main.humidity} %`,
					wind: `Wind: ${data.wind.speed} km/h`,
					condition: `Weather Condition: ${data.weather[0].description}`,
				};

				setWeatherInfo(weather);
			})
			.catch((error) => {
				setError(error.message);
				setWeatherInfo(null);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<div className='weather-container'>
			<input
				type='text'
				placeholder='Enter city name'
				value={city}
				onChange={(e) => setCity(e.target.value)}
			/>
			<button onClick={getWeather}>Get Weather</button>

			{loading && <p>Loading...</p>}

			{error && <p className='error'>{error}</p>}

			{weatherInfo && (
				<div className='weather-info'>
					<h3>{weatherInfo.location}</h3>
					<p>{weatherInfo.temperature}</p>
					<p>{weatherInfo.feelsLike}</p>
					<p>{weatherInfo.humidity}</p>
					<p>{weatherInfo.wind}</p>
					<p>{weatherInfo.condition}</p>
				</div>
			)}
		</div>
	);
}

export default App;

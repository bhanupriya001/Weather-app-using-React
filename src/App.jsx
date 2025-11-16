import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError('City not found.');
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom align="center">
        Weather App
      </Typography>
      <TextField
        label="Enter City"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        fullWidth
        onClick={fetchWeather}
        disabled={!city || loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Weather'}
      </Button>

      {error && <Alert severity="error" style={{ marginTop: '1rem' }}>{error}</Alert>}

      {weather && (
        <Card style={{ marginTop: '2rem' }}>
          <CardContent>
            <Typography variant="h5">{weather.name}</Typography>
            <Typography>{weather.weather[0].description}</Typography>
            <Typography>Temperature: {weather.main.temp} °C</Typography>
            <Typography>Humidity: {weather.main.humidity}%</Typography>
            <Typography>Wind Speed: {weather.wind.speed} m/s</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default App;

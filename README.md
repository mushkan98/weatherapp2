# Beautiful Animated Weather App

A stunning, responsive, and animated weather application built with React JS featuring:
- 🎨 Beautiful glass-morphism design
- 🌈 Dynamic gradient backgrounds based on weather
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🌤️ Real-time weather data

## Features

- **Animated Backgrounds**: Dynamic gradients that change based on weather conditions
- **Glass-morphism UI**: Modern frosted glass effect cards
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Powered by Framer Motion
- **Real-time Data**: Fetches live weather data from OpenWeatherMap API
- **Search Functionality**: Search for any city worldwide

## Setup Instructions

1. **Get an API Key**:
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Install Dependencies**:
   ```bash
   cd weather-app
   npm install
   ```

3. **Add API Key**:
   - Open `src/services/weatherService.js`
   - Replace `YOUR_API_KEY_HERE` with your actual OpenWeatherMap API key

4. **Start the Application**:
   ```bash
   npm start
   ```

## Technologies Used

- **React JS**: Frontend framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Axios**: HTTP client
- **CSS3**: Styling and animations

## Design Features

- **Gradient Backgrounds**: 5 different gradient themes based on weather conditions
- **Glass-morphism Cards**: Semi-transparent cards with backdrop blur
- **Floating Animations**: Weather icons gently float up and down
- **Responsive Grid**: Adapts to different screen sizes
- **Smooth Transitions**: All interactions have smooth transitions

## Weather Conditions

The app supports various weather conditions with unique styling:
- ☀️ Clear/Sunny
- ☁️ Cloudy
- 🌧️ Rainy
- ❄️ Snowy
- ⛈️ Thunderstorm

## Mobile Responsive

The app is fully responsive with:
- Optimized layouts for mobile screens
- Touch-friendly buttons and inputs
- Scaled typography and spacing
- Collapsible weather details on small screens

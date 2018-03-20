import React, { Component } from "react";
import Day from "../Day/Day";
import Hourly from "../Hourly/Hourly";
import "./Form.css"

class Form extends Component {
  constructor() {
    super();
    this.state = {
      weather: [],
      hourly: [],
      forecast: [],
      name: '',
      country: '',
      temp: '',
      humidity: '',
      wind: '',
      sunrise: '',
      sunset: '',
      longitude: 0,
      latitude: 0
    };

    this.success = this.success.bind(this);
  }

  handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.success, this.error);
  }

  success(pos) {
    this.setState({
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude
    });
    {
      console.log("Your current position is:");
    }
    {
      console.log(`Latitude : ${this.state.latitude}`);
    }
    {
      console.log(`Longitude: ${this.state.longitude}`);
    }

    this.getLocation();
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  getLocation() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${
      this.state.latitude
      }&lon=${
      this.state.longitude
      }&APPID=1baacd93abb3b6db530672512cd75f6c&units=metric`
    )
      .then(this.handleErrors)
      .then(res => res.json())
      .then(res => {
        this.setState(
          {
            name: res.name,
            country: res.sys.country,
            temp: res.main.temp,
            humidity: res.main.humidity,
            wind: res.wind,
            sunrise: res.sys.sunrise,
            sunset: res.sys.sunset
          },
          function () {
            console.log(res);
          }
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  calculateTime(time) {
    return new Date(time * 1e3).toISOString().slice(-13, -5);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const cityname = e.nativeEvent.target.elements[0].value;

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&APPID=1baacd93abb3b6db530672512cd75f6c&units=metric&cnt=8`
    )
      .then(this.handleErrors)
      .then(res => res.json())
      .then(res => {
        this.setState(
          {
            hourly: res.list
          },
          function () {
            console.log(res);
          }
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&APPID=1baacd93abb3b6db530672512cd75f6c&units=metric`
    )
      .then(this.handleErrors)
      .then(res => res.json())
      .then(res => {
        this.setState(
          {
            forecast: res.list
          },
          function () {
            console.log(res);
            console.log("Hopefully we have some weather", this.state.weather);
          }
        );
      })
      .catch(function (error) {
        console.log(error);
      });


  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input className="form-input"
            type="text"
            placeholder="Type the city name here"
            name="city"
          />
          <button className="form-button" type="submit">Get weather</button>
        </form>


        <div className='App-location'>
          <p className="App-location-component">Location: {this.state.name}, {this.state.country}</p>
          <p className="App-location-component">Temprature: {this.state.temp} &deg;C / {Math.floor(this.state.temp * 9 / 5 + 32)} &deg; F</p>
          <p className="App-location-component">Humidity: {this.state.humidity} %</p>
          <p className="App-location-component">Windspeed: {this.state.wind.speed} m/s</p>
          <p className="App-location-component">Sunrise: {this.calculateTime(this.state.sunrise)}</p>
          <p className="App-location-component">Sunset: {this.calculateTime(this.state.sunset)}</p>
        </div>


        {/*this.state.weather && this.state.weather.length > 0 ? (
          <div className="App-weather">
            <img
              src={`http://openweathermap.org/img/w/${
                this.state.weather[0].icon
              }.png`}
              title="Title goes here"
              alt="A weather icon, describing the... weather"
            />
            <br />
            <p>{this.state.weather[0].description}</p>
            <br />
            Temprature {this.state.main.temp} &deg; C
            <br />
            Highest {this.state.main.temp_max} &deg; C
            <br />
            Lowest {this.state.main.temp_min} &deg; C
            <br />
            Wind speed {this.state.wind.speed} m/s
            <br />
            Humidity {this.state.main.humidity} %
            <br />
            Sunrise: {this.state.sun.sunrise}
            <br />
            Sunset: {this.state.sun.sunset}
          </div>
        ) : (
          <p>No results yet</p>
        )*/}

        {this.state.hourly && this.state.hourly.length > 0 ? (
          <div className="App-hourly">
            {" "}
            {this.state.hourly.map((interval, index) => {
              return <Hourly key={index} interval={interval} />;
            })}
          </div>
        ) : (
            ""
          )}

        {this.state.forecast && this.state.forecast.length > 0 ? (
          <div className="App-forecast">
            {" "}
            {this.state.forecast.map((interval, index) => {
              return <Day key={index} interval={interval} />;
            })}
          </div>
        ) : (
            ""
          )}
      </div>
    );
  }
}

export default Form;

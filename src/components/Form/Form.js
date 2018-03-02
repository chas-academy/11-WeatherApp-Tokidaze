import React, { Component } from "react";
import Day from "../Day/Day";
import Hourly from "../Hourly/Hourly";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      weather: [],
      forecast: [],
      location: [],
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

  /*groupBy(array, property) {
    return array.reduce(function(groups, item) {
      const interval = groups[property];
      groups[interval] = groups[interval] || [];
      groups[interval].push(interval);
      return groups;
    });
  }*/

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
            location: res.list
          },
          function() {
            console.log(res);
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });
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
          function() {
            console.log(res);
          }
        );
      })
      .catch(function(error) {
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
          function() {
            console.log(res);
            console.log("Hopefully we have some weather", this.state.weather);
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input
            type="text"
            placeholder="Type the city name here"
            name="city"
          />
          <button type="submit">Get weather</button>
        </form>
        <div>
          <p id="demo"> Location</p>
          <button onClick={this.componentDidMount.bind(this)}>
            Get Location
          </button>
        </div>

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

import React, { Component } from "react";
import { Proptypes } from "prop-types";

class Location extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="small-10 small-centered column">
                        <div className="location-container">
                            <h4>{this.props.interval.dt}</h4>
                            <div className="row collapse">
                                <div className="small-2 medium-3 column weather-icon">
                                    <img
                                        alt="weather-icon"
                                        src={`http://openweathermap.org/img/w/${
                                            this.props.interval.weather[0].icon
                                            }.png`}
                                    />
                                </div>
                                <div className="small-10 medium-9 column">
                                    {this.props.interval.weather[0].description}
                                    <br />
                                    {this.props.interval.main.temp} &deg; Celcius
                  <br />
                                    Highest {this.props.interval.main.temp_max} &deg; C
                  <br />
                                    Lowest {this.props.interval.main.temp_min} &deg; C
                  <br />
                                    Wind speed {this.props.interval.wind.speed} m/s
                  <br />
                                    Humidity {this.props.interval.main.humidity} %
                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Location;
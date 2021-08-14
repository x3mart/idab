import React, {Fragment, useEffect, useState} from "react";
import {geolocated} from "react-geolocated";

const APIURL = "http://api.openweathermap.org";
const REACT_APP_APIKEY = '408ce464cbf3f0aad8aa69d2d9c283da';
const GOOGLE_MAP_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const axios = require("axios");

const ShowWeather = ({coords}) => {
  const [data, setData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [icon, setIcon] = useState('')

  const [latitude, setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');


  useEffect(() => {
    if (coords!==null) {
      setLatitude(coords.latitude)
      setLongitude(coords.longitude)
    }
  }, [coords])

  useEffect(() => {
    axios.get(
      `${APIURL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ru&units=metric&appid=${REACT_APP_APIKEY}`
    ).then(resp => setData(resp.data)).catch(err => console.log(err))
  }, [latitude, longitude])

  useEffect(() => {
    if (data !== null && latitude !== '' && longitude !== '') {
      setIcon(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
      setLoaded(true)
    }
  })

  return (
    <Fragment>
      {loaded &&
      <div className="quickview__item">
        <div className="quickview__item-total">{Math.round(data.main.temp)}&deg;<img src={icon} alt="weather icon"/></div>
        <div className="quickview__item-description">
          <i className="fas fa-map-marker-alt mr-2"/>
          <span className="admin-text-light">{data.name}</span>
        </div>
      </div>
      }
    </Fragment>
  )

}

export default  geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(ShowWeather);

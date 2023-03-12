
import React, { useEffect, useState } from 'react'
import "./stylee.css"

import Weathercard from '../Weathercard';

function Tempp() {

  const [searchValue,setSearchValue] = useState("Lahore");

  const [tempInfo,setTempInfo] = useState({});

  const getWeatherInfo = async()=>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=906fa9b6584de63c1bc1f76729043826`

      const res = await fetch(url);
      const data =await res.json();

      const {temp,humidity,pressure} = data.main;

      const {main:weathermood} = data.weather[0];

      const {name} = data;
      const {speed} = data.wind;
      const {country,sunset} = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      };
      setTempInfo(myNewWeatherInfo)

      
      
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(()=>{
    getWeatherInfo();
  },[])
  
  return (
   <>
    <div className='wrap'>
    <div className='search'>
      <input type="text"  placeholder='search...' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}/>

      <button className='searchButton' type='button' onClick={getWeatherInfo}>
        Search
      </button>
    </div>
    </div>
   


    {/* our temp card */}

    <Weathercard tempInfo={tempInfo} />


   </>
  )
}

export default Tempp


import React from 'react';
const api ={
  key : "cc4d37ded5d706e23d86647a0ed4f816",
  base :"http://api.weatherstack.com/"
  // new:" http://api.weatherstack.com/current?access_key=cc4d37ded5d706e23d86647a0ed4f816&query=New%20York"
  // new :"http://api.weatherstack.com/current?access_key=cc4d37ded5d706e23d86647a0ed4f816&query=Newyork"
}
function App() {
  const [query, setQuery] = React.useState();
  const [weather,setWeather] = React.useState('');  


  function search(eve) {
    if (eve.key == "Enter") { 
      fetch(`${api.base}current?access_key=${api.key}&query=${query}`)
        .then(res => res.json())
        .then(result => {
          setQuery();
          setWeather(result);
          console.log(result);
        });
    }
  }
  const dateBuilder = (d) =>{
    let months = ["January","February","March","April","May","June","July","Augest","September","October","November","December"];
    let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ( `${day} ${date} ${month} ${year} `)
  
  }

  const imageList = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUbbXRnIfcOaiKWoIQsIhAg8CEi0GCsNqvYA&usqp=CAU"
  let borderRadius ={
    borderRadius:"50%"
  }
  return (
      <div className={(typeof weather.current != "undefined")?(( weather.current.temperature> 16)?'app warm':'app'):'image'}>
        <main>
          <div className="name">weather App</div>
          <div className="logo">
            <img src={imageList} width="200" height="100" style={borderRadius} />
          </div>
          <div className="search-box">
            <input 
              type="text" 
              className="search-bar" 
              placeholder="place capital. "
              onChange={e => setQuery(e.target.value)}
              value={query}
              // let name = {value.replace(" ","%20")}
              onKeyPress={search}></input>
              {console.log(query)}

          </div>
          {(typeof weather.current != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.location.name},{weather.location.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className='temp'>temp :{(weather.current.temperature)}° c</div>
              <div className="weather">{weather.current.weather_descriptions}</div>
              <div className='wind'> humidity:{weather.current.humidity}</div>
            </div>
          </div>
            
          ):  ('')}
        </main> 
      </div>
  );
}

export default App;


// {(typeof weather.main != "undefined")?(( weather.main.temp> 16)?'app warm':'app'):'app'}

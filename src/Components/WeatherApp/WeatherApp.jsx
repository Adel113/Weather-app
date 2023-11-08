import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'

export const WeatherApp = () => {

    // un tableau de tenus 
    const tenues = [
        `
          
            <h4>Hommes : Short en lin, t-shirt léger, sandales</h4>
            <h4>Femmes : Robe légère en coton, sandales, chapeau de soleil</h4>
          
        `,
        `
          
            <h4>Hommes : Pantalon en lin, chemise à manches courtes, baskets légères</h4>
            <h4>Femmes : Short en jean, débardeur en coton, espadrilles</h4>
          
        `,
        `
        
            <h4>Hommes : Jean, t-shirt à manches longues, chaussures de sport</h4>
            <h4>Femmes : Jean slim, pull léger, baskets</h4>
          
        `,
        `
        
            <h4>Hommes : Pantalon en toile, pull en laine, bottines</h4>
            <h4>Femmes : Jupe en cuir, chemisier en soie, bottes</h4>
          
        `,
        `
        
            <h4>Hommes : Pantalon en laine, pull en cachemire, manteau</h4>
            <h4>Femmes : Robe en laine, collants épais, veste en cuir</h4>
          
        `,
        `
        
            <h4 >Hommes : Pantalon en velours, pull en laine épais, manteau d'hiver</h4>
            <h4>Femmes : Pantalon en laine, pull en laine douillette, écharpe, manteau long</h4>
          
        `
      ];


    // stocker KEY de l'api dans api-key
    let api_key = "419922c37cbe53c60c69ab4ac1cf68f3";

    // 1-wicon c'est la ou je stocke l'état (donc je stocke l'icone que j'ai mis dans la page de base )
    // 2-setwicon c'est la fonction qui vas me permetre de mettre a jour mon icone 
    const [wicon,setWicon] = useState(cloud_icon);


    // 1-tenueIndex c'est la ou je stocke l'état (donc je stocke la tenu que j'ai mis dans la page de base )
    // 2-setTenueIndex c'est la fonction qui vas me permetre de mettre a jour ma tenu dépend de la temp 
    const [tenueIndex, setTenueIndex] = useState(0); // Utilisez 0 comme valeur par défaut


    const search = async () => {

        // récupèrer le nom de la ville saisie par l'utilisateur 
        const element = document.getElementsByClassName("cityInput")
        // retourner 0 si l'utillisateur n'a rien saisie 
        if(element[0].value ===""){
            return 0;
        }


        // 1-insérer le nom de la ville saisie par l'utilisateur dans l'url de l'api 
        // 2-et insérer KEY de l'api
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;


        //récupèrer les données de l'Api et le stocker dans response 
        let response = await fetch(url);

        // Transformer les données récupèrer en json
        let data = await response.json();


        //récupèrer les données de la page "JSX"
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wend");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");


        // modifier les données récuperer pour les afficher sur l'interface 
        humidity[0].innerHTML = data.main.humidity +" %";
        wind[0].innerHTML = data.wind.speed + " km/h";
        temperature[0].innerHTML = data.main.temp + " °C";
        location[0].innerHTML = data.name;



        // récupèrer id de l'icone puis le remplacer par un autre
        if(data.weather[0].icon ==="01d" || data.weather[0].icon ==="01n"){
            setWicon(clear_icon);
        }else if(data.weather[0].icon === "02d" || data.weather[0].icon ==="02n"){
            setWicon(cloud_icon);
        }else if(data.weather[0].icon === "03d" || data.weather[0].icon ==="03n"){
            setWicon(drizzle_icon);
        }else if(data.weather[0].icon === "04d" || data.weather[0].icon ==="04n"){
            setWicon(drizzle_icon);
        }else if(data.weather[0].icon === "09d" || data.weather[0].icon ==="09n"){
            setWicon(rain_icon);
        }else if(data.weather[0].icon === "10d" || data.weather[0].icon ==="10n"){
            setWicon(rain_icon);
        }else if(data.weather[0].icon === "13d" || data.weather[0].icon ==="13n"){
            setWicon(snow_icon);
        }else {
            setWicon(clear_icon);
        }   
        
        
        // récupèrer la temp pour suggerer une tenu
        if (data.main.temp < 10) {
            setTenueIndex(5); // Tenue très froide
          } else if (data.main.temp >= 10 && data.main.temp < 15) {
            setTenueIndex(4); // Tenue froide
          } else if (data.main.temp >= 15 && data.main.temp < 20) {
            setTenueIndex(3); // Tenue fraîche
          } else if (data.main.temp >= 20 && data.main.temp < 25) {
            setTenueIndex(2); // Tenue modérée
          } else if (data.main.temp >= 25 && data.main.temp < 30) {
            setTenueIndex(1); // Tenue chaude
          } else if (data.main.temp >= 30) {
            setTenueIndex(0); // Tenue très chaude
          }
    }
  return (
    
    <div className="container">
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='search your city' />
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">
            --°c
        </div>
        <div className="weather-location">
            xxxxxx
        </div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" />
                <div className="data">
                    <div className="humidity-percent">--%</div>
                    <div className="text">Humidity</div>
                </div> 
            </div>
            <div className="element">
                <img src={wind_icon} alt="" />
                <div className="data">
                    <div className="wend">-- km/h</div>
                    <div className="text">Wind Speed</div>
                </div> 
            </div>
        </div>
        <div className="tenue">
          <h1>Suggestions de tenues :</h1>
          <div className="tenus" dangerouslySetInnerHTML={{ __html: tenues[tenueIndex] }}></div>
        </div>

    </div>
  )
}
export default WeatherApp

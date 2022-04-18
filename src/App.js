import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/pages/HomePage";
import Favorites from "./components/pages/Favorites";
import { useEffect, useState } from "react";

import { fetchWeatherData } from "../src/components/store/index";
import { useDispatch } from "react-redux";
import { ACCU_WEATHER_API_KEY } from "../src/components/store/index";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [toogleFahrenheitCelsius, setToogleFahrenheitCelsius] = useState(true);

  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();

  function addToFavoritesHandler(favorite) {
    console.log(favorite);
    setFavorites(function (prevState) {
      const prevStateToAddTo = [...prevState];
      prevStateToAddTo.push(favorite);
      return prevStateToAddTo;
    });
  }

  function removeFromFavoritesHandler(key) {
    setFavorites(function (prevState) {
      return prevState.filter(function (favorite) {
        return favorite.selectedCity.value.cityKey !== key;
      });
    });
  }

  function checkIfFavoriteHandler(key) {
    for (const favorite of favorites) {
      if (favorite.selectedCity.value.cityKey === key) {
        return true;
      }
    }
    return false;
  }

  useEffect(function () {
    // ************* BONUS 1: GET DEFAULT location BY THE Geolocation API ************* ///
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(function (position) {
        const url =
          "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
        const query = `?apikey=${ACCU_WEATHER_API_KEY}&q=${position.coords.latitude}%2C${position.coords.longitude}&language=en-us&details=false&toplevel=false"`;
        fetch(url + query)
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            return response.json();
          })
          .then(function (data) {
            const currentPos = {
              value: {
                cityKey: data.Key,
                cityName: data.LocalizedName,
                cityCountry: data.Country.LocalizedName,
              },
              label: `${data.LocalizedName}, ${data.Country.LocalizedName}`,
            };
            dispatch(fetchWeatherData(currentPos, false));
          })
          .catch(function (error) {
            console.log("error in fetching starting location data");
            console.log(error);
            alert(`error in fetching starting location data`);
          });
      });
    }
    // ************* BONUS 1: GET DEFAULT location BY THE Geolocation API ************* ///
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/homepage" />} />
        <Route
          path="/homepage"
          element={
            <HomePage
              addToFavorites={addToFavoritesHandler}
              removeFromFavorites={removeFromFavoritesHandler}
              checkIfFavorite={checkIfFavoriteHandler}
            />
          }
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;

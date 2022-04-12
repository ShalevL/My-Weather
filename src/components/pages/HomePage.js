import WeatherInfo from "../WeatherInfo";
import SearchInput from "../SearchInput";
import { configurationActions } from "../store";
import { useDispatch } from "react-redux";
import classes from "../pages/HomePage.module.css";
import Switch from "react-switch";
import { useState } from "react";

function HomePage(props) {
  const dispatch = useDispatch();
  const [showFahrenheitOrCelsius, setShowFahrenheitOrCelsius] = useState(true);

  function toggleFahrenheitCelsiusHandler() {
    dispatch(configurationActions.toggleFahrenheitCelsius());
  }

  function updateFahrenheitOrCelsius() {
    toggleFahrenheitCelsiusHandler();
    setShowFahrenheitOrCelsius(function (prevState) {
      return !prevState;
    });
  }

  return (
    <div className={classes.topContainer}>
      <SearchInput checkIfFavorite={props.checkIfFavorite} />
      <WeatherInfo
        addToFavorites={props.addToFavorites}
        removeFromFavorites={props.removeFromFavorites}
      />
      <div className={classes.checkButton}>
        <span>Fahrenheit / Celsius</span>
        <Switch
          onChange={updateFahrenheitOrCelsius}
          checked={showFahrenheitOrCelsius}
          onColor="ffa07a"
        />
      </div>
    </div>
  );
}

export default HomePage;

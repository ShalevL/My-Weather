import { useDispatch, useSelector } from "react-redux";
import { currentSelectedCityActions } from "./store";
import classes from "../components/WeatherInfo.module.css";
import TodayWeather from "./TodayWeather";
import TheNextFiveDays from "./TheNextFiveDays";
import Heart from "react-animated-heart";

function WeatherInfo(props) {
  const dispatch = useDispatch();
  const currentSelectedCity = useSelector(function (state) {
    return state.currentSelectedCity;
  });

  function addToFavoritesHandler() {
    dispatch(currentSelectedCityActions.updateFavoriteStatus());
    props.addToFavorites({
      selectedCity: currentSelectedCity.selectedCity,
      currentDayData: currentSelectedCity.currentDayData,
    });
  }

  function removeFromFavoritesHandler() {
    dispatch(currentSelectedCityActions.updateFavoriteStatus());
    props.removeFromFavorites(currentSelectedCity.selectedCity.value.cityKey);
  }

  return (
    <div>
      <div className={classes.topConteiner}>
        <div className={classes.todayAndFav}>
          <TodayWeather selectedCity={currentSelectedCity} />
          <Heart
            isClick={currentSelectedCity.isFavorite}
            onClick={
              currentSelectedCity.isFavorite
                ? removeFromFavoritesHandler
                : addToFavoritesHandler
            }
          />
        </div>
      </div>
      <div className={classes.bottomConteiner}>
        <TheNextFiveDays selectedCity={currentSelectedCity} />
      </div>
    </div>
  );
}

export default WeatherInfo;

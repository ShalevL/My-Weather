import { useDispatch } from "react-redux";
import TodayWeather from "../TodayWeather";
import { fetchWeatherData } from "../store/index";
import { Link } from "react-router-dom";
import classes from "../pages/Favorites.module.css";
import CardGroup from "react-bootstrap/CardGroup";

function Favorites(props) {
  const dispatch = useDispatch();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.daysContainer}>
        {props.favorites.map(function (day, index) {
          return (
            <CardGroup className={classes.cardGroup} key={index}>
              <div>
                <TodayWeather
                  key={index}
                  selectedCity={props.favorites[index]}
                />
                <Link
                  className="btn"
                  to="/"
                  onClick={function () {
                    dispatch(
                      fetchWeatherData(
                        props.favorites[index].selectedCity,
                        true
                      )
                    );
                  }}
                >
                  Show Details
                </Link>
              </div>
            </CardGroup>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;

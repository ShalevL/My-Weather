import NextDayWeather from "./NextDayWeather";
import classes from "../components/TheNextFiveDays.module.css";
import CardGroup from "react-bootstrap/CardGroup";

function TheNextFiveDays(props) {
  return (
    <div>
      <div className={classes.nextFiveDaysCondition}>
        <h2>{props.selectedCity.nextFiveDaysData?.weatherCondition}</h2>
      </div>
      <div>
        <div className={classes.nextFiveDaysContainer}>
          <CardGroup className={classes.cardGroup}>
            {props.selectedCity.nextFiveDaysData.Days?.map(function (
              day,
              index
            ) {
              return (
                <NextDayWeather
                  key={index}
                  date={day.date}
                  fahrenheitMin={day.fahrenheitMinTempValue}
                  fahrenheitMax={day.fahrenheitMaxTempValue}
                  celsiusMin={day.celsiusMinTempValue}
                  celsiusMax={day.celsiusMaxTempValue}
                  weatherCondition={day.weatherCondition}
                  weatherIcon={day.weatherIcon}
                />
              );
            })}
          </CardGroup>
        </div>
      </div>
    </div>
  );
}

export default TheNextFiveDays;

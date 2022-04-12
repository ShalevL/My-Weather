import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import classes from "../components/TodayWeather.module.css";

function Today(props) {
  const configuration = useSelector(function (state) {
    return state.configuration;
  });

  return (
    <div>
      <Card
        className={classes.dropShadow}
        border="secondery"
        style={{ width: "13rem" }}
      >
        <Card.Header>{props.selectedCity.selectedCity.label}</Card.Header>
        <Card.Body>
          <Card.Subtitle></Card.Subtitle>
          <Card.Text>
            {configuration.fahrenheitCelsius
              ? props.selectedCity.currentDayData?.celsiusTempValue
              : props.selectedCity.currentDayData?.fahrenheitTempValue}
            &deg; {`${configuration.fahrenheitCelsius ? "C" : "F"}`}
          </Card.Text>
        </Card.Body>
        <Card.Text>
          <img
            src={`./icons/${props.selectedCity.currentDayData.weatherIcon}.png`}
            alt=""
          />
        </Card.Text>
        <Card.Footer>
          {props.selectedCity.currentDayData?.weatherCondition}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Today;

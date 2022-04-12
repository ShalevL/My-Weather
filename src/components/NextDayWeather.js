import { useSelector } from "react-redux";
import classes from "../components/NextDayWeather.module.css";
import Card from "react-bootstrap/Card";

function NextDayWeather(props) {
  const configuration = useSelector(function (state) {
    return state.configuration;
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <Card
        className={classes.dropShadow}
        border="secondery"
        style={{ width: "13rem" }}
      >
        <Card.Header>{days[new Date(props.date).getDay()]}</Card.Header>
        <Card.Body>
          <Card.Subtitle>{`Minimum`}</Card.Subtitle>
          <Card.Text>
            {configuration.fahrenheitCelsius
              ? props.celsiusMin.toFixed(1)
              : props.fahrenheitMin.toFixed(1)}
            &deg; {`${configuration.fahrenheitCelsius ? "C" : "F"}`}
          </Card.Text>
          <Card.Subtitle>{`Maximum`}</Card.Subtitle>
          <Card.Text>
            {configuration.fahrenheitCelsius
              ? props.celsiusMax.toFixed(1)
              : props.fahrenheitMax.toFixed(1)}
            &deg; {`${configuration.fahrenheitCelsius ? "C" : "F"}`}
          </Card.Text>
        </Card.Body>
        <Card.Text>
          <img src={`./icons/${props.weatherIcon}.png`} alt="" />
        </Card.Text>
        <Card.Footer>{props.weatherCondition}</Card.Footer>
      </Card>
    </div>
  );
}
export default NextDayWeather;

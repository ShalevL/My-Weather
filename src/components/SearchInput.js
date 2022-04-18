import { useDispatch } from "react-redux";
import Select from "react-select";
import { fetchWeatherData } from "../components/store/index";
import { useState } from "react";
import { ACCU_WEATHER_API_KEY } from "../components/store/index";

function SearchInput(props) {
  const dispatch = useDispatch();
  const [autoCompleteFetchedData, setAutoCompleteFetchedData] = useState([]);
  function inputChangeHandler(searchInput) {
    const url =
      "http://dataservice.accuweather.com/locations/v1/cities/autocomplete/";
    const query = `?apikey=${ACCU_WEATHER_API_KEY}&q=${searchInput}&language=en-us`;
    fetch(url + query)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then(function (data) {
        console.log("fetched auto complete data");
        const tmpArr = [];
        for (const city of data) {
          tmpArr.push({
            value: {
              cityKey: city.Key,
              cityName: city.LocalizedName,
              cityCountry: city.Country.LocalizedName,
            },
            label: `${city.LocalizedName}, ${city.Country.LocalizedName}`,
          });
        }
        setAutoCompleteFetchedData(tmpArr);
      })
      .catch(function (error) {
        console.log("error in fetching auto complete data");
        console.log(error);
      });
  }

  function selectedHandler(selectedCity) {
    const isFavorite = props.checkIfFavorite(selectedCity.value.cityKey);
    dispatch(fetchWeatherData(selectedCity, isFavorite));
  }

  return (
    <div>
      <Select
        onInputChange={inputChangeHandler}
        options={autoCompleteFetchedData}
        onChange={selectedHandler}
      />
    </div>
  );
}

export default SearchInput;

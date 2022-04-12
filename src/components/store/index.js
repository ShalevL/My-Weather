import { createSlice, configureStore } from "@reduxjs/toolkit";

export const API_KEY = "R5iVJfxhOQWqV0NE4hWnVSBR5jBQGeZG";

// ************************************* REDUX SLICES ************************************* //
const currentSelectedCitySlice = createSlice({
  name: "currentSelectedCity",
  initialState: {
    isFavorite: false,
    selectedCity: {},
    currentDayData: {},
    nextFiveDaysData: {},
  },
  reducers: {
    updateCityWeatherDataAndInformation(state, action) {
      let updatedCurrentDay = {};
      for (const item of action.payload.currentDayData) {
        updatedCurrentDay = {
          date: item.LocalObservationDateTime,
          weatherCondition: item.WeatherText,
          celsiusTempValue: item.Temperature.Metric.Value,
          fahrenheitTempValue: item.Temperature.Imperial.Value,
          weatherIcon: item.WeatherIcon,
        };
      }
      let updatedNextFiveDays = {
        weatherCondition: "",
        Days: [],
      };
      updatedNextFiveDays.weatherCondition =
        action.payload.nextFiveDaysData.Headline.Text;
      for (const day of action.payload.nextFiveDaysData.DailyForecasts) {
        updatedNextFiveDays.Days.push({
          date: day.Date,
          celsiusMinTempValue: ((day.Temperature.Minimum.Value - 32) * 5) / 9,
          celsiusMaxTempValue: ((day.Temperature.Maximum.Value - 32) * 5) / 9,
          fahrenheitMinTempValue: day.Temperature.Minimum.Value,
          fahrenheitMaxTempValue: day.Temperature.Maximum.Value,
          weatherIcon: day.Day.Icon,
          weatherCondition: day.Day.IconPhrase,
        });
      }

      state.selectedCity = action.payload.selectedCity;
      state.currentDayData = updatedCurrentDay;
      state.nextFiveDaysData = updatedNextFiveDays;
      state.isFavorite = action.payload.isFavorite || false;
    },

    updateFavoriteStatus(state, action) {
      console.log("update currentSelectedCity Favorite Status");
      state.isFavorite = !state.isFavorite;
    },
  },
});

// ************* BONUS 3: Toggle Fahrenheit / Celsius ************* ///
const configurationSlice = createSlice({
  name: "configuration",
  initialState: {
    fahrenheitCelsius: false,
    darkLightMode: false,
  },
  reducers: {
    toggleFahrenheitCelsius(state) {
      state.fahrenheitCelsius = !state.fahrenheitCelsius;
    },
    toggleDarkLightMode(state) {
      state.darkLightMode = !state.darkLightMode;
    },
  },
});
// ************* BONUS 3: Toggle Fahrenheit / Celsius ************* ///
// ************************************* REDUX SLICES ************************************* //

// ************************************* REDUX STORE ************************************* //

const store = configureStore({
  reducer: {
    currentSelectedCity: currentSelectedCitySlice.reducer,
    configuration: configurationSlice.reducer,
  },
});

// ************************************* REDUX STORE ************************************* //

// ************************************* THUNK ************************************* //
export function fetchWeatherData(selectedCity, isFavorite) {
  return function (dispatch) {
    let currentDayData = [];
    let nextFiveDaysData = {};

    const dayUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
    const dayQuery = `${selectedCity.value.cityKey}?apikey=${API_KEY}`;

    const nextFiveUrl =
      "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    const nextFiveQuery = `${selectedCity.value.cityKey}?apikey=${API_KEY}`;

    fetch(dayUrl + dayQuery)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then(function (dayData) {
        return dayData;
      })
      .then(function (dayData) {
        currentDayData[0] = dayData[0];
        return fetch(nextFiveUrl + nextFiveQuery);
      })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then(function (fiveData) {
        return fiveData;
      })
      .then(function (fiveData) {
        nextFiveDaysData = { ...fiveData };
      })
      .then(function () {
        dispatch(
          currentSelectedCityActions.updateCityWeatherDataAndInformation({
            selectedCity: selectedCity,
            currentDayData: currentDayData,
            nextFiveDaysData: nextFiveDaysData,
            isFavorite: isFavorite,
          })
        );
      })
      .catch(function (error) {
        console.log("error in fetchWeatherData");
        console.log(error);
        alert("Please Try Again, error in fetching Weather Data");
      });
  };
}

export const currentSelectedCityActions = currentSelectedCitySlice.actions;
export const configurationActions = configurationSlice.actions;

export default store;

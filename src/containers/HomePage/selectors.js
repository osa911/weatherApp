import { createSelector, createStructuredSelector } from 'reselect';

const REDUCER = 'Home';

const userGeo = state => state[REDUCER].userGeo;
const currentWeatherR = state => state[REDUCER].currentWeather;
const isLoad = state => state[REDUCER].isLoad;
const isLoadCity = state => state[REDUCER].isLoadCity;
const searchType = state => state[REDUCER].searchType;
const findCityList = state => state[REDUCER].findCityList;
const savedCity = state => state[REDUCER].savedCity;
const savedCityEntityR = state => state[REDUCER].savedCityEntity;
const lang = state => state['App'].lang;

const currentWeather = createSelector(
  currentWeatherR,
  (item) => ({
    ...item,
    main: {
      ...item.main,
      temp: (item.main.temp - 273.15).toFixed(2)
    }
  })
);

const savedCityEntity = createSelector(
  savedCityEntityR,
  (item) => item.map(i => ({
    ...i,
    main: {
      ...i.main,
      temp: (i.main.temp - 273.15).toFixed(2),
    }
  }))
);

export default createStructuredSelector({
  userGeo,
  currentWeather,
  isLoad,
  isLoadCity,
  searchType,
  findCityList,
  savedCity,
  savedCityEntity,
  lang,
});

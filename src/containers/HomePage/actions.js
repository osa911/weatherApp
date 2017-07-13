import * as types from './constants';

/**
 * Load weather when user gave his geoPosition
 * @param  {namber} lat [lat pos]
 * @param  {namber} lon [lon pos]
 * @return {object}     [response]
 */
export const loadWeatherByGeo = ({ lat, lon, lang }) => ({
  types: [
    types.LOAD_WEATHER_BY_GEO_REQUEST,
    types.LOAD_WEATHER_BY_GEO_SUCCESS,
    types.LOAD_WEATHER_BY_GEO_FAILURE,
  ],
  promise: api => api.get(`/api/weather?lat=${lat}&lon=${lon}&lang=${lang}`),
});

export const findCity = (name, type, lang) => ({
  types: [
    types.FIND_CITY_REQUEST,
    types.FIND_CITY_SUCCESS,
    types.FIND_CITY_FAILURE,
  ],
  promise: api => api.get(`/api/find?q=${name}&type=${type}&lang=${lang}`),
});

export const loadSavedCity = (ids, lang) => ({
  types: [
    types.LOAD_SAVED_CITY_REQUEST,
    types.LOAD_SAVED_CITY_SUCCESS,
    types.LOAD_SAVED_CITY_FAILURE,
  ],
  promise: api => api.get(`/api/group?id=${ids}&lang=${lang}`),
});

/**
 * save geoPosition user to store
 * @param  {object} geo [geo position: lat, lon ]
 * @return {object}     [geo position]
 */
export const saveUserGeo = (geo) => ({
  type: types.SAVE_USER_GEOPOSITION,
  geo,
});

export const setSearchCityName = name => ({
  type: types.SET_SEARCH_CITY_NAME,
  name,
});

export const setSearchType = searchType => ({
  type: types.SET_SEARCH_TYPE,
  searchType,
});

export const addToSavedCity = cityId => ({
  type: types.ADD_CITY_TO_SAVED,
  cityId,
});

export const delCity = cityId => ({
  type: types.DEL_CITY,
  cityId,
});

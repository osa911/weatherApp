import { combineReducers } from 'redux';
import * as types from './constants';

const initialState = {
  isLoad: true,
  isLoadCity: false,
  userGeo: {
    lat: '',
    lon: ''
  },
  searchType:     'like',
  currentWeather: {
    name: '',
    main: {
      temp: '',
    },
    sys:  {
      country: '',
    },
    weather: [],
    wind:    {
      speed: '',
    },
  },
  findCityList:    [],
  savedCity:       JSON.parse(localStorage.getItem('CityIds')) || [],
  savedCityEntity: JSON.parse(localStorage.getItem('CityEntity')) || [],
};

const userGeo = (state = initialState.userGeo, action) => {
  switch (action.type) {
    case types.SAVE_USER_GEOPOSITION:
      return action.geo;
    default:
      return state;
  }
};

const currentWeather = (state = initialState.currentWeather, action) => {
  switch (action.type) {
    case types.LOAD_WEATHER_BY_GEO_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const searchType = (state = initialState.searchType, action) => {
  switch (action.type) {
    case types.SET_SEARCH_TYPE:
      return action.searchType;
    default:
      return state;
  }
};

const findCityList = (state = initialState.findCityList, action) => {
  switch (action.type) {
    case types.FIND_CITY_SUCCESS:
      return action.data.list;
    default:
      return state;
  }
};

const savedCity = (state = initialState.savedCity, action) => {
  switch (action.type) {
    case types.ADD_CITY_TO_SAVED:
      const newState = [ ...state, action.cityId];
      localStorage.setItem('CityIds', JSON.stringify(newState));
      return newState;
    case types.DEL_CITY:
      const newState2 = state.filter(i => i !== action.cityId);
      localStorage.setItem('CityIds', JSON.stringify(newState2));
      return newState2;
    default:
      return state;
  }
};

const savedCityEntity = (state = initialState.savedCityEntity, action) => {
  switch (action.type) {
    case types.LOAD_SAVED_CITY_SUCCESS:
      localStorage.setItem('CityEntity', JSON.stringify(action.data.list));
      return action.data.list;
    case types.DEL_CITY:
      const newState = state.filter(i => i.id !== action.cityId);
      localStorage.setItem('CityEntity', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

const isLoad = (state = initialState.isLoad, action) => {
  switch (action.type) {
    case types.LOAD_WEATHER_BY_GEO_REQUEST:
      return true;
    case types.LOAD_WEATHER_BY_GEO_SUCCESS:
    case types.LOAD_WEATHER_BY_GEO_FAILURE:
      return false;
    default:
      return state;
  }
};

const isLoadCity = (state = initialState.isLoadCity, action) => {
  switch (action.type) {
    case types.FIND_CITY_REQUEST:
      return true;
    case types.FIND_CITY_SUCCESS:
    case types.FIND_CITY_FAILURE:
      return false;
    default:
      return state;
  }
};



export default combineReducers({
  userGeo, // object
  currentWeather, // object
  isLoad, // bool
  isLoadCity, // bool
  searchType, // string
  findCityList, // array
  savedCity, // array
  savedCityEntity, // array
});

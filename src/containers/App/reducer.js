import { combineReducers } from 'redux';
import * as types from './constants';

const initialState = {
  lang: 'ru',
  langArr: [
    { value: 'ru', label: 'RU'},
    { value: 'ua', label: 'UA'},
    { value: 'en', label: 'EN'},
  ],
};

const lang = (state = initialState.lang, action) => {
  switch (action.type) {
    case types.SET_LANG:
      return action.lang;
    default:
      return state;
  }
};
const langArr = (state = initialState.langArr, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  lang, // string
  langArr, // array
});

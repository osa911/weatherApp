import { createSelector, createStructuredSelector } from 'reselect';

const REDUCER = 'App';

const lang = state => state[REDUCER].lang;
const langArr = state => state[REDUCER].langArr;

export default createStructuredSelector({
  lang,
  langArr,
});

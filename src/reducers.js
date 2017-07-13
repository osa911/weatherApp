import { combineReducers } from 'redux';

import App from './containers/App/reducer';
import Home from './containers/HomePage/reducer';

const rootReducer = combineReducers({
  App,
  Home,
});

export default rootReducer;

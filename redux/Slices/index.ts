import {combineReducers} from 'redux';
import categoryReducer from './categories.slice';
import machineReducer from './machine.slice';

const rootReducer = combineReducers({
  Category: categoryReducer,
  Machine: machineReducer,
});

export default rootReducer;

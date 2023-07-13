import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducer";
import { legacy_createStore as createStore } from 'redux';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// redux/store.js

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import goalsReducer from "./reducers";

const store = createStore(goalsReducer, applyMiddleware(thunk));

export default store;

import { applyMiddleware, createStore } from "redux";
import AllReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { accessCheck, refreshingIdleTime } from "./middleware";

export default function configureStore() {
  const combineMiddleware = [accessCheck, thunk, refreshingIdleTime];
  const store = createStore(
    AllReducer,
    composeWithDevTools(applyMiddleware(...combineMiddleware))
  );
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

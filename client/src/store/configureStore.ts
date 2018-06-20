import {
  applyMiddleware,
  compose,
  createStore,
  Store,
} from "redux";
import { IStore } from "./IStore";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

export const configureStore = (): Store<IStore> => {
  const enhancer = compose(
    applyMiddleware(thunk),
  );

  const store = createStore(reducer, enhancer);

  return store;
};
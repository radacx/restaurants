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
  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
  );

  return createStore(reducer, enhancer);
};
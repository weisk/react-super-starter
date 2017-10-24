import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
//import createLogger from 'redux-logger';
//import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

//const logger = createLogger();
//const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  const middlewares = [
  //  sagaMiddleware,
  //  logger
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(...enhancers)
  );

  // Extensions
  //store.runSaga = sagaMiddleware.run
  store.asyncReducers = {}; // Async reducer registry

  return store;
}

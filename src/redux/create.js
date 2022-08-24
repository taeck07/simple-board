import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import { createLogger } from 'redux-logger/src';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const create = () => {
  const store = configureStore({
    reducer: rootReducer(history),
    middleware: [sagaMiddleware, logger],
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default create;

import { combineReducers } from '@reduxjs/toolkit';
import commentReducer from './comments';
import { connectRouter } from 'connected-react-router';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    comments: commentReducer,
  });

export default rootReducer;

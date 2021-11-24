import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { DEBUG } from '../../env';
import user from './user';

// MIDDLEWARES AND ENHANCERS

const middlewares = [thunk];

if (true) {
  middlewares.push(logger);
}

// REDUCERS

const reducers = combineReducers({
  user,
});

// PERSISTENCE CONFIG

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// STORE

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

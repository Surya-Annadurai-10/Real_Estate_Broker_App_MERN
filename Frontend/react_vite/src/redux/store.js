import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import logger from "redux-logger";
import { userReducer } from '../slices/slice';
import storage from 'redux-persist/lib/storage';

const rootPersist = combineReducers({
  user : userReducer
})

const persistConfig = {
    key : "root",
    storage,
    version : 1,
}

const persistreducer = persistReducer(persistConfig , rootPersist) 

export const store =  configureStore({
  reducer: persistreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Optional: Ignore specific paths in the state too
        // ignoredPaths: ['some.nested.path'],
      },
    }),
});

export const persistor = persistStore(store)
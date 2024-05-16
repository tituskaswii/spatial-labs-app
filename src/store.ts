import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
// import {setupListeners} from '@reduxjs/toolkit/query';
import {setupListeners} from '@reduxjs/toolkit/dist/query/react';
import {extApi} from '@services/extApi';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

const reducers = combineReducers({
  [extApi.reducerPath]: extApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['profile', 'first', 'logged', 'token'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }).concat(
  //     thunkMiddleware,
  //     extApi.middleware,
  //   ),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import DownloadSliceSlice, { type DownloadSliceSliceData } from '@/context/DownloadProviderV2/slice';
import AppearanceSlice from './slice/appearance';
import type { Appearance } from './slice/appearance/appearance-types';

const persistConfig = {
  key: 'root',
  storage
};

export const store = configureStore({
  reducer: {
    appearance: persistReducer<Appearance>(persistConfig, AppearanceSlice),
    download: persistReducer<DownloadSliceSliceData>(persistConfig, DownloadSliceSlice)
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
});

export const persistor = persistStore(store);

export type ApplicationState = ReturnType<typeof store.getState>;

export type ApplicationDispatch = typeof store.dispatch;

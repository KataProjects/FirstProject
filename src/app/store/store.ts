import { configureStore } from '@reduxjs/toolkit';
import { baseAPI } from '@shared/api/baseAPI';
import { bookingsApi } from '@features/tableBookings/models/bookingsApi';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseAPI.middleware,
      bookingsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

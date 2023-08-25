import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RTKQueryMiddlewares } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }).concat(RTKQueryMiddlewares),
});

export type RootState = ReturnType<typeof rootReducer>;

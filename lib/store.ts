import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { authApi } from "./features/auth/authAPI";
import { usersApi } from "./features/users/usersApi";
import { tasksApi } from "./features/tasks/tasksAPI";
import { weatherApi } from "./features/weather/weatherApi";
import { locationApi } from "./features/location/locationApi";

const rootReducer = combineSlices(
  authApi,
  usersApi,
  authSlice,
  tasksApi,
  weatherApi,
  locationApi
);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        authApi.middleware,
        usersApi.middleware,
        tasksApi.middleware,
        weatherApi.middleware,
        locationApi.middleware
      );
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

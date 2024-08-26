import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import localitiesReducer from './localitiesSlice';

export const store = configureStore({
    reducer: {
        localities: localitiesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

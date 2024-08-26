import { createSlice} from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './Store';
import localitiesData from '../assets/data/data.json';

interface Location{
    localityName: string;
    cityName: string;
    localityId: string;
}

interface LocalitiesState {
    localities: Location[];
}

const initialState: LocalitiesState = {
  localities: localitiesData as Location[],
};

const localitiesSlice = createSlice({
  name: 'localities',
  initialState,
  reducers: {},
});

// 1.to get location details by ID
export const selectLocalityById = (localityId: string) =>
    createSelector(
        (state: RootState) => state.localities.localities,
        (localities) => localities.find(locality => locality.localityId === localityId)
    );

// 2.to get a list of localities by input text
export const selectLocalitiesByText = (text: string) =>
    createSelector(
        (state: RootState) => state.localities.localities,
        (localities) => {
            // if (!Array.isArray(localities)) {
            //     console.error('Expected localities to be an array but got:', localities);
            //     return [];
            // }
            return localities.filter(locality =>
                locality.localityName.toLowerCase().includes(text.toLowerCase())
            );
        }
    );

export default localitiesSlice.reducer;

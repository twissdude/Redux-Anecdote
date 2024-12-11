import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload; // Set the filter string from the input
    }
  }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;

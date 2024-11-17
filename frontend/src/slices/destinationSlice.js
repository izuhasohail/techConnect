// src/features/destinationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destination: '',
};

const destinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
  },
});

export const { setDestination } = destinationSlice.actions;
export default destinationSlice.reducer;

// src/features/sourceSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  source: '',
};

const sourceSlice = createSlice({
  name: 'source',
  initialState,
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload;
    },
  },
});

export const { setSource } = sourceSlice.actions;
export default sourceSlice.reducer;

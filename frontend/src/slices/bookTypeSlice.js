// src/features/bookTypeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookType: 'flight', // or any initial value you want
};

const bookTypeSlice = createSlice({
  name: 'bookType',
  initialState,
  reducers: {
    setBookType: (state, action) => {
      state.bookType = action.payload;
    },
  },
});

export const { setBookType } = bookTypeSlice.actions;
export default bookTypeSlice.reducer;

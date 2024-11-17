// src/store.js

import { configureStore } from '@reduxjs/toolkit';

// Import your slices
import bookTypeReducer from './slices/bookTypeSlice';
import sourceReducer from './slices/sourceSlice';
import destinationReducer from './slices/destinationSlice';
import dateReducer from './slices/dateSlice';

// Configure the store and combine all slices
export const store = configureStore({
  reducer: {
    bookType: bookTypeReducer,
    source: sourceReducer,
    destination: destinationReducer,
    date: dateReducer,
  },
});

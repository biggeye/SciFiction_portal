import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from '../../utils/redux/gallerySlice';

export const store = configureStore({
  reducer: {
    gallery: galleryReducer
  }
});

import { createSlice } from '@reduxjs/toolkit';

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: []
  },
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action) => {
      state.images = state.images.filter(image => image.id !== action.payload.id);
    }
  }
});

export const { setImages, addImage, removeImage } = gallerySlice.actions;

export const selectImages = state => state.gallery.images;

export default gallerySlice.reducer;
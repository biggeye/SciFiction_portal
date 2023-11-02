
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const fetchGalleryImages = createAsyncThunk(
  'gallery/fetchImages',
  async () => {
    const { data, error } = await createServerComponentClient() 
        .from("master_content")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(page * rowsPerPage, (page + 1) * rowsPerPage - 1);

    if (error) {
        console.log("error", error);
        throw new Error(error.message);
    }
    
    return data;
  }
);


const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: [],
    status: 'idle',
    error: null
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGalleryImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchGalleryImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setImages, addImage, removeImage } = gallerySlice.actions;

export const selectImages = state => state.gallery.images;

export default gallerySlice.reducer;

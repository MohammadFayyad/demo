import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    loadFavorites(_, action) {
      return action.payload;
    },
    addToFavorites(state, action) {
      const movie = action.payload;
      const exists = state.find((m) => m.id === movie.id);
      if (!exists) {
        const updated = [...state, movie];
        AsyncStorage.setItem('favorites', JSON.stringify(updated));
        return updated;
      }
    },
    removeFromFavorites(state, action) {
      const updated = state.filter((movie) => movie.id !== action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addToFavorites, removeFromFavorites, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

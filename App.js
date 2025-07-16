import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import AppNavigator from "./navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadFavorites } from "./redux/slices/favoritesSlice";

const LoadFavoritesOnStart = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem("favorites");
      if (data) {
        dispatch(loadFavorites(JSON.parse(data)));
      }
    };
    load();
  }, []);

  return children;
};

export default function App() {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <Provider store={store}>
  <LoadFavoritesOnStart>
    <AppNavigator />
  </LoadFavoritesOnStart>
</Provider>

  );
}

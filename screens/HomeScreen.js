import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/slices/moviesSlice';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar />
      <FilterDropdown />
      {status === 'loading' ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
});

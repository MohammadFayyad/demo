import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { searchMovies, fetchMovies } from '../redux/slices/moviesSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim().length > 2) {
      dispatch(searchMovies(text));
    } else {
      dispatch(fetchMovies());
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        value={query}
        onChangeText={handleSearch}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2e2e2e',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
  },
  input: {
    color: '#fff',
    fontSize: 16,
  },
});

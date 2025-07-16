import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchMovies, setCategory } from '../redux/slices/moviesSlice';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Movies', value: 'top_rated' },
  { label: 'Upcoming Movies', value: 'upcoming' },
  { label: 'Now Playing Movies', value: 'now_playing' },
];

const FilterDropdown = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSelect = (value) => {
    dispatch(setCategory(value));
    dispatch(fetchMovies(value));
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.filterButton}>
        <Text style={styles.filterText}>Filter ▾</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => handleSelect(item.value)}
              style={styles.option}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default FilterDropdown;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  filterButton: {
    backgroundColor: '#2e2e2e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  filterText: {
    color: 'white',
    fontSize: 14,
  },
  dropdown: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: '#2e2e2e',
    borderRadius: 6,
    padding: 4,
    zIndex: 10,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  optionText: {
    color: 'white',
  },
});

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/slices/favoritesSlice';
import { AntDesign } from '@expo/vector-icons';

const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromFavorites(id));
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No favorite movies yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.details}>Release Date: {item.release_date}</Text>
            <Text style={styles.details}>Rates: {item.vote_average}</Text>
          </View>
          <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
            <AntDesign name="delete" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#121212',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    color: '#aaa',
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: '#c00',
    padding: 8,
    borderRadius: 6,
  },
});

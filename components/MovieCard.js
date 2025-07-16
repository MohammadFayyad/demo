import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/slices/favoritesSlice';
import { AntDesign } from '@expo/vector-icons';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.find((fav) => fav.id === movie.id);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
      </View>
      <TouchableOpacity onPress={handleFavorite} style={styles.heart}>
        <AntDesign name={isFavorite ? 'heart' : 'hearto'} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
  backgroundColor: '#1e1e1e',
  borderRadius: 12,
  margin: 10,
  padding: 10,
  flexDirection: 'row',
  shadowColor: '#000',
  shadowOpacity: 0.3,
  shadowRadius: 4,
},
image: {
  width: 100,
  height: 150,
  borderRadius: 10,
},
info: {
  marginLeft: 10,
  flex: 1,
  justifyContent: 'center',
},
title: {
  fontSize: 18,
  color: '#fff',
  fontWeight: 'bold',
},
rating: {
  color: '#aaa',
  marginTop: 4,
},

});

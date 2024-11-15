// src/screens/HomeScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.rapidmock.com/api/vikuman/v1/movies/all',
      );
      setMovies(response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredMovies(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies or shows"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Text
            style={styles.movieTitle}
            onPress={() => navigation.navigate('Details', {id: item.id})}>
            {item.title}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 10},
  searchBar: {borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10},
  movieTitle: {fontSize: 18, marginVertical: 5},
});

export default HomeScreen;

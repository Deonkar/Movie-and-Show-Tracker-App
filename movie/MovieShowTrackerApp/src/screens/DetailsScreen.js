import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import axios from 'axios';

const DetailsScreen = ({route}) => {
  const {id} = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.rapidmock.com/api/vikuman/v1/movies?id=${id}`,
      );
      setMovie(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWatchList = async status => {
    try {
      await axios.post('https://api.rapidmock.com/api/vikuman/v1/mylist/add', {
        movieId: id,
        status,
      });
      alert('Added to list!');
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text>{movie.description}</Text>
      <Button
        title="Add to To Watch"
        onPress={() => addToWatchList('To Watch')}
      />
      <Button
        title="Add to Watched"
        onPress={() => addToWatchList('Watched')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  title: {fontSize: 24, fontWeight: 'bold'},
});

export default DetailsScreen;

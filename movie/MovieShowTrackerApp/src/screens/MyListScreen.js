// src/screens/MyListScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';

const MyListScreen = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    fetchMyList();
  }, []);

  const fetchMyList = async () => {
    try {
      const response = await axios.get(
        'https://api.rapidmock.com/api/vikuman/v1/mylist',
      );
      setMyList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myList}
        keyExtractor={item => item.movieId.toString()}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 10},
});

export default MyListScreen;

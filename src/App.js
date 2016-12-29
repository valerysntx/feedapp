import React from 'react'
import {Component, Image, StyleSheet, Text, View} from 'react-native';

import FeedApi from './Api/FeedApi';

import FeedDetail from './Screens/FeedDetail';
import HomeScreen from './Screens/HomeScreen';
import EntryDetail from './Screens/EntryDetail';

// Components
const Card = ({ children }) => <View style={styles.card}>{children}</View>
const Title = ({ children }) => <Text style={styles.title}>{children}</Text>
const Photo = ({ uri }) => <Image source={{ uri }} style={styles.image} />

export default class App extends React.Component {
  render(){
    return (<Card><Title>App Card</Title></Card>)
  }
}

// Styles
const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  image: {
    height: 40,
    marginVertical: 10,
    width: 40
  }
});
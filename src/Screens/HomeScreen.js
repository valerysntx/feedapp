import React from "react";
import { ScrollView, TouchableHighlight, Image, Button, Component, StyleSheet, Text, View } from 'react-native';
import FeedApi from "../Api/FeedApi";
import FeedDetail from './FeedDetail';

export default class HomeScreen extends React.Component {

 constructor(){
   super()
   //TODO: load feed
 }


_showFeedDetails(feed ) {
    FeedApi.fetchRss(feed.feedUrl)
    .then((res) => {
      if(res.responseStatus == 200) {
        var entries = res.responseData.feed.entries;
          this.props.navigator.push ({
            component: FeedDetail,
            title: feed.title,
            rightButtonIcon: ()=> (<Button></Button>),
            onRightButtonPress: () => {this._showFeedActionSheet(feed)},
            passProps: {
              entries: entries
            }
          })
        } else { throw res.responseDetails;}
    });
  }

_renderFeed(feed) {
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,.1)"
        onPress={() => { this._showFeedDetails(feed) }}
        key={feed.length}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>{feed.title}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.description}>{feed.description}</Text>
            <Text style={styles.smallText}>{feed.feedUrl}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
};

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  wrapper: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  title: {
    paddingTop: 2,
    paddingBottom: 3,
    paddingRight: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: "#B4AEAE",
    fontSize: 12,
    marginBottom: 5,
  },
  smallText: {
    fontSize: 11,
    textAlign: 'right',
    color: "#B4AEAE",
  }
});

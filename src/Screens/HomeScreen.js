import React from "react";
import { UIManager, TouchableHighlight, Image, Button, StyleSheet, Text, View, Alert } from 'react-native';
import { Api } from "../Api/FeedApi";
import FeedDetail from './FeedDetail';

var logo = require('./../logo.svg');

export default class HomeScreen extends React.Component {
  
  constructor(props){
    super(props);
  }

  parse(response) { return response }
 parseJSON(response) {  return JSON.parse(response)  }

  updateState(prev,next) {
    this.setState({entries: next});  
  }

  componentDidMount(){
    Api.rss(this.props.feed.feedUrl).then(r=> 
    this.setState({
      feed:
      {
        feedUrl: this.props.feed.feedUrl,
        entries: this.parseJSON(r),
        title: this.props.feed
      }})
    );
     
  }
  _renderIcon(feed){
    return (<Image style={styles.icon} progressiveRenderingEnabled={true} source={logo}/>)
  }

async _showFeedDetails( feed ) {
    this.props = {feed};  
    this.props.feed.entries = { ... await Api.rss(this.props.feed.feedUrl).then(res => { 
        return Promise.resolve(this.parse(res))
    }).catch(r => {
        return Promise.reject(this.parse(r))
    }) 
  }
}

_renderFeed(feed) {
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,.1)"
        onPress={(e) => {   
          this._showFeedDetails(feed)
      }}
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
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 15
  }
});

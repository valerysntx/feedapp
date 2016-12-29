import React from "react";
import { View, Component } from 'react-native';

export class FeedApi {    
fetchRss(uri) {
 
    if (!(/^http:\/\//.test(uri))) {
      uri = "http://" + uri;
    }

    var GOOGLE_FEED_API_URL = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=';
    var url = GOOGLE_FEED_API_URL + encodeURIComponent(uri);

    return fetch(url).then((res) => res.json());
  }
}

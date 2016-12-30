import React from "react";
import { View, Component, AsyncCache } from 'react-native';
import fetch from 'isomorphic-fetch'
import fetchCached from 'fetch-cached';

export const fetchRss = (uri) => {
  if (!(/^http:\/\//.test(uri))) {
    uri = "http://" + uri;
  }

  var GOOGLE_FEED_API_URL = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=';
  var url = GOOGLE_FEED_API_URL + encodeURIComponent(uri);
  return url;
}

const acceptJsonCors = (from = '*') => {
     let h = new Headers();
     h.append('Access-Control-Allow-Origin', from);
     return h;
};

const _fetch = fetchCached({
  fetch: fetch,
  cache: {
    get: (k) => AsyncCache.get(k),
    set: (k, v) => AsyncCache.set(k, v)
  }
});

const _Get = (uri) => fetch(uri, { method:'GET', headers: acceptJsonCors(), mode:'no-cors' })
                      .then(response => bodyReader(response))
            

const bodyReader = (response) => {
  return response.clone().json().catch(function() {
    return response.text();
  });
}

export const Api = {
  local: (uri) => fetch(uri),
  rss: (uri) => _Get(fetchRss(uri))
}
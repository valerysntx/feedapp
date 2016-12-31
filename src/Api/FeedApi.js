import React from "react";
import { View, Component, AsyncCache } from 'react-native';
import fetch from 'isomorphic-fetch'
import fetchCached from 'fetch-cached';
import {FEED_PROXY_API_URL} from '../Config';

export const fetchRss = (uri) => {
  if (!(/^http:\/\//.test(uri))) {
    uri = "http://" + uri;
  }
  var url = FEED_PROXY_API_URL + encodeURIComponent(uri);
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

const _Get = (uri) => fetch(uri, { 
  method:'GET', 
  headers: acceptJsonCors(), 
  mode:'cors' 
}).then(response => resposeReader(response))
  .catch(response => resposeReader(response))
            
const resposeReader = (response) => {
  if (response.headers.get('Content-Type') === 'application/json') {
    return Promise.resolve(response.clone().json())
                  .then((response) => response)
                  .catch(r=> Promise.resolve(response.body.getReader().read()));
  }
  return Promise.resolve(response.clone().text())
                  .then((response) => response)
                  .catch(r=> Promise.resolve(response.body.getReader().read()));
}

export const Api = {
  local: (uri) => fetch(uri),
  rss: (uri) => _Get(fetchRss(uri))
}
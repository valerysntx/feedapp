import React, { AppRegistry, ScrollView, Component, Image, StyleSheet, Text, View } from 'react-native';

import App from './App';

// App registration and rendering
AppRegistry.registerComponent('MyApp',() => App);
AppRegistry.registerRunnable('MyApp', App);
AppRegistry.runApplication('MyApp', { rootTag: document.getElementById('react-root') })
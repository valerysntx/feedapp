import React from 'react';
import { View,
  WebView,
  StyleSheet
} from 'react-native';

export class EntryDetail extends React.Component {
  constructor(props){
    super(...props)
  }
  
  render() 
  { 
    return ( <View style={styles.container}>
              <WebView
                automaticallyAdjustContentInsets={true}
                style={styles.webView}
                html={this.props.entry.content}
                javaScriptEnabledAndroid={true}
                onNavigationStateChange={this.onNavigationStateChange} 
                />        
            </View> )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  title: {
    paddingTop: 2,
    paddingBottom: 3,
    paddingRight: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  webView: {
  },
});
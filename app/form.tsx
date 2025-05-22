import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Stack } from 'expo-router';

export default function FormScreen() {
  // Replace this URL with your actual Google Form URL
  const formUrl = 'https://forms.gle/pQtXEN9TAbC1wFgR8';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Form' }} />
      <WebView
        source={{ uri: formUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
}); 
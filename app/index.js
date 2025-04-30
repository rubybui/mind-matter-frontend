import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Mind Matters</Text>

      <Text style={styles.header}>Stress Level Test</Text>
      <Text style={styles.subtext}>Find out{"\n"}How stress{"\n"}are you</Text>

      <Image
        source={require('../assets/images/stress meter.png')} // make sure this image exists
        style={styles.gauge}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')} // navigate to login screen
      >
        <Text style={styles.buttonText}>Let’s Start !</Text>
        <Text style={styles.arrow}>➜</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d7f0dd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#1a7346',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#1a1a1a',
  },
  subtext: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  gauge: {
    width: 280,
    height: 180,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1a7346',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
  },
  arrow: {
    fontSize: 22,
    color: '#fff',
  },
});

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.centerContent}>
        {/* Replace this with your logo or illustration */}
        <Image
          source={require('@/assets/images/mind_matters.png')} // Replace with actual icon
          style={styles.icon}
          resizeMode="contain"
        />

        <Text style={styles.title}>Let’s Start by registering yourself with us or login to your existing account</Text>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('./register')}
        >
          <Text style={styles.registerButtonText}>Register Yourself</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('./signin')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

       
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F3EC',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  registerButton: {
    backgroundColor: '#2F6B3A',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#E2E2E2',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#777',
    marginBottom: 16,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});

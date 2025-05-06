import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { theme } from './theme'; 
import { useAuth } from './context/AuthContext';
import { config } from './config';
import ThemedButton from '@/components/themed/ThemedButton';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        login(data.token, { user_id: data.user_id }); // you can fetch user details later
        router.push('/survey'); // or wherever your main screen is
      } else {
        alert(data?.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong during login.');
    }
  };
  
  return (
    <View style={styles.container}>
                 <Image
           source={require('@/assets/images/mind_matters.png')} // adjust if in a different path
           style={styles.logo}
           resizeMode="contain"
         />
      <Text style={styles.subtitle}>Sign In</Text>

   
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

<ThemedButton title={"Log In"} onPress={handleLogin}/>

      <TouchableOpacity onPress={() => router.push('/resetPassword')}>
        <Text style={styles.linkSmall}>Forgot Password?</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
      justifyContent: 'center',
    },
    logo: {
      width: 64,
      height: 64,
      alignSelf: 'center',
      marginBottom: theme.spacing.md,
    },
    title: {
      fontSize: theme.font.size.lg,
      fontWeight: theme.font.weight.bold,
      textAlign: 'center',
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: theme.font.size.base,
      textAlign: 'center',
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm + 4,
      fontSize: theme.font.size.base,
      marginBottom: theme.spacing.md + 2,
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radius.lg,
      alignItems: 'center',
      marginTop: theme.spacing.sm + 4,
      elevation: 3,
    },
    buttonText: {
      color: theme.colors.surface,
      fontSize: theme.font.size.base,
      fontWeight: theme.font.weight.semiBold,
    },
    linkSmall: {
      marginTop: theme.spacing.md,
      color: theme.colors.link,
      textAlign: 'center',
      fontSize: theme.font.size.sm,
    },
  });

  export default SignInScreen
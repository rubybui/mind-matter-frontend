import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { theme } from './theme'; 

const ResetPasswordScreen = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
  
    return (
      <View style={styles.container}>
         <Image
           source={require('@/assets/images/mind_matters.png')} // adjust if in a different path
           style={styles.logo}
           resizeMode="contain"
         />
   
        <Text style={styles.subtitle}>Reset Password</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType="email-address"
        />
  
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
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
  export default ResetPasswordScreen
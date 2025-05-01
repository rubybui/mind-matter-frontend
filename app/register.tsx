import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from './theme';
import { config } from '@/app/config'; // adjust the path based on your project structure

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: name.trim(),
                    email: emailOrPhone.trim(),
                    password: password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Account created successfully!');
                router.push('/term');
            } else {
                Alert.alert('Error', result?.error || 'Registration failed.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/mind_matters.png')} // adjust if in a different path
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.subtitle}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/signin')}>
                <Text style={styles.linkSmall}>Already have an account? Sign In</Text>
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

export default RegisterScreen;

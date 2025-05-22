import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { theme } from './theme';
import { Stack } from 'expo-router';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'About Us',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>About Mind Matter</Text>
          <Text style={styles.text}>
            Mind Matter is a student-created application developed as part of the WiSys Spark Grant Program. 
            Our platform is dedicated to supporting mental health and well-being through accessible, 
            compassionate care, connecting individuals with the resources and support they need 
            to navigate life's challenges and maintain mental wellness.
          </Text>

          <Text style={styles.title}>WiSys Spark Grant Program</Text>
          <Text style={styles.text}>
            This project is supported by the WiSys Spark Grant Program, which advances small-scale, 
            proof-of-concept research projects. The program helps innovators advance their knowledge 
            and technology toward commercialization, providing awards of $500 - $10,000 per project 
            to faculty or academic staff for implementation and completion of short-term projects.
          </Text>

          <Text style={styles.title}>Our Vision</Text>
          <Text style={styles.text}>
            We envision a world where mental health support is readily available to everyone, 
            breaking down barriers to care and fostering a community of understanding and support.
            As a student-led initiative, we're particularly focused on addressing the unique 
            mental health needs of the academic community.
          </Text>

          <Text style={styles.title}>Our Commitment</Text>
          <Text style={styles.text}>
            We are committed to providing a platform that prioritizes user privacy, 
            security, and well-being. Our team continuously works to improve our services 
            and ensure we meet the highest standards of care and support.
          </Text>

          <Text style={styles.title}>Contact</Text>
          <Text style={styles.text}>
            For questions about the WiSys Spark Grant Program or the submission platform, 
            please email mindmatter.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.font.size.lg,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  text: {
    fontSize: theme.font.size.base,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  featureContainer: {
    marginBottom: theme.spacing.lg,
  },
  feature: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: theme.font.size.md,
    fontWeight: theme.font.weight.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  featureText: {
    fontSize: theme.font.size.base,
    color: theme.colors.text,
    lineHeight: 22,
  },
}); 
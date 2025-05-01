import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or use any icon set you prefer

const TermsAndConditionsScreen: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [showControls, setShowControls] = useState(false);

  const handleContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setShowControls(contentHeight > 600); // Show buttons only if content is long
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={handleContentSizeChange}
        contentContainerStyle={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.heading}>Terms & Conditions</Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Purpose of the App</Text>{'\n'}
            This App is designed to help students self-assess their mental health and stress levels
            through surveys and feedback tools. The App does not provide medical or psychological
            advice, diagnosis, or treatment.
          </Text>

          <Text style={styles.paragraph}>
            The App is intended for use by students above the age of 18. By using the App, you
            confirm that you meet this requirement.
          </Text>

          <Text style={styles.paragraph}>
            By using this App, you voluntarily consent to participate in stress self-assessments and
            agree to the collection and processing of your data as described in the Privacy Policy.
            You may withdraw your consent at any time by discontinuing use of the App.
          </Text>

          <Text style={styles.paragraph}>
            The App may collect information such as stress survey responses, device information, and
            general demographics. All collected data will be handled in accordance with our Privacy
            Policy and applicable laws. No personal identifying information will be shared with
            third parties without your consent. Aggregated, anonymized data may be used for research
            or reporting purposes.
          </Text>

          <Text style={styles.paragraph}>
            You agree to use the App for its intended educational and self-assessment purposes only.
            Misuse of the App, including providing false information or using it to harm others, is
            prohibited.
          </Text>

          <Text style={styles.paragraph}>
            The App is not a substitute for professional counseling or psychological help. If you
            are experiencing serious stress or mental health issues, please contact a licensed
            professional or emergency services. The developers of the App are not responsible for
            any decisions made based on the App’s content or results.
          </Text>

          <Text style={styles.paragraph}>
            All content and features of the App, including texts, surveys, logos, and design, are
            the intellectual property of the App developers and protected by copyright laws.
            Unauthorized use is prohibited.
          </Text>

          <Text style={styles.paragraph}>
            We reserve the right to update or modify these Terms at any time without prior notice.
            Continued use of the App after such changes constitutes your acceptance of the new
            Terms.
          </Text>
        </View>
      </ScrollView>

      {showControls && (
        <View style={styles.scrollControls}>
          <TouchableOpacity style={styles.iconButton} onPress={scrollToTop}>
            <Ionicons name="arrow-up-circle-outline" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={scrollToBottom}>
            <Ionicons name="arrow-down-circle-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 80, // leave space for scroll buttons
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '600',
  },
  scrollControls: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    flexDirection: 'column',
    gap: 12,
  },
  iconButton: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default TermsAndConditionsScreen;

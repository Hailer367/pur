import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/constants';

export const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Card>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>App preferences and configuration</Text>
          <Text style={styles.comingSoon}>🚧 Coming Soon</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  comingSoon: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.warning,
  },
});
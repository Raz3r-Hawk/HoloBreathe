import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { theme, isDark, themeMode, setThemeMode } = useTheme();
  const { user, updateProfile, signOut, deleteAccount } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.navigate('Welcome');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign out');
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount();
              navigation.navigate('Welcome');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete account');
            }
          },
        },
      ]
    );
  };

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Background gradient */}
      <LinearGradient
        colors={isDark 
          ? ['#0A0A0F', '#1A1A2E', '#16213E'] 
          : ['#FFFFFF', '#F8F9FA', '#E3F2FD']
        }
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Profile
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Manage your account and preferences
          </Text>
        </View>

        {/* Profile Information */}
        <Card glassmorphism style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Personal Information
          </Text>
          
          {isEditing ? (
            <View>
              <Input
                label="First Name"
                value={formData.firstName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                style={styles.input}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                style={styles.input}
              />
              <View style={styles.buttonRow}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    setIsEditing(false);
                    setFormData({
                      firstName: user?.firstName || '',
                      lastName: user?.lastName || '',
                    });
                  }}
                  variant="outline"
                  size="medium"
                  style={styles.button}
                />
                <Button
                  title="Save"
                  onPress={handleSave}
                  variant="primary"
                  size="medium"
                  style={styles.button}
                />
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.infoRow}>
                <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                  Name
                </Text>
                <Text style={[styles.value, { color: theme.colors.text }]}>
                  {user?.firstName} {user?.lastName}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                  Email
                </Text>
                <Text style={[styles.value, { color: theme.colors.text }]}>
                  {user?.email}
                </Text>
              </View>
              <Button
                title="Edit Profile"
                onPress={() => setIsEditing(true)}
                variant="outline"
                size="medium"
                style={styles.editButton}
              />
            </View>
          )}
        </Card>

        {/* Theme Preferences */}
        <Card glassmorphism style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Theme Preference
          </Text>
          <View style={styles.themeOptions}>
            {themeOptions.map((option) => (
              <Button
                key={option.value}
                title={option.label}
                onPress={() => setThemeMode(option.value as any)}
                variant={themeMode === option.value ? 'primary' : 'outline'}
                size="small"
                style={styles.themeButton}
              />
            ))}
          </View>
        </Card>

        {/* About Section */}
        <Card glassmorphism style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            About
          </Text>
          <View style={styles.aboutButtons}>
            <Button
              title="Privacy Policy"
              onPress={() => navigation.navigate('PrivacyPolicy')}
              variant="ghost"
              size="medium"
              style={styles.aboutButton}
            />
            <Button
              title="About HoloBreathe"
              onPress={() => navigation.navigate('About')}
              variant="ghost"
              size="medium"
              style={styles.aboutButton}
            />
          </View>
        </Card>

        {/* Account Actions */}
        <Card glassmorphism style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Account Actions
          </Text>
          <View style={styles.actionButtons}>
            <Button
              title="Sign Out"
              onPress={handleSignOut}
              variant="outline"
              size="medium"
              style={styles.actionButton}
            />
            <Button
              title="Delete Account"
              onPress={handleDeleteAccount}
              variant="outline"
              size="medium"
              style={[styles.actionButton, { borderColor: theme.colors.error }]}
              textStyle={{ color: theme.colors.error }}
            />
          </View>
        </Card>

        {/* Back Button */}
        <Button
          title="Back to Protocols"
          onPress={() => navigation.goBack()}
          variant="primary"
          size="large"
          gradient
          style={styles.backButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
  },
  editButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  themeButton: {
    flex: 1,
  },
  aboutButtons: {
    gap: 12,
  },
  aboutButton: {
    alignSelf: 'flex-start',
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    alignSelf: 'flex-start',
  },
  backButton: {
    marginTop: 16,
  },
});
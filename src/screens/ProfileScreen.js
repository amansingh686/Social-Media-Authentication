import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';

const ProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: false,
    facebook: false,
  });

  useEffect(() => {
    loadUserProfile();
    checkConnectedAccounts();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem('userProfile');
      if (profile) {
        setUserProfile(JSON.parse(profile));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile');
    }
  };

  const checkConnectedAccounts = async () => {
    try {
      const isGoogleSignedIn = await GoogleSignin.isSignedIn();
      const isFacebookSignedIn = await LoginManager.getLoginBehavior();
      
      setConnectedAccounts({
        google: isGoogleSignedIn,
        facebook: isFacebookSignedIn !== 'NATIVE_WITH_FALLBACK',
      });
    } catch (error) {
      console.error('Error checking connected accounts:', error);
    }
  };

  const handleDisconnect = async (platform) => {
    try {
      if (platform === 'google') {
        await GoogleSignin.signOut();
      } else if (platform === 'facebook') {
        await LoginManager.logOut();
      }
      
      setConnectedAccounts(prev => ({
        ...prev,
        [platform]: false,
      }));
      
      Alert.alert('Success', `Disconnected from ${platform}`);
    } catch (error) {
      Alert.alert('Error', `Failed to disconnect from ${platform}`);
    }
  };

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: userProfile.photoURL }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connected Accounts</Text>
        
        <View style={styles.accountItem}>
          <Text style={styles.accountText}>Google</Text>
          {connectedAccounts.google ? (
            <TouchableOpacity
              style={styles.disconnectButton}
              onPress={() => handleDisconnect('google')}
            >
              <Text style={styles.disconnectButtonText}>Disconnect</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.notConnected}>Not Connected</Text>
          )}
        </View>

        <View style={styles.accountItem}>
          <Text style={styles.accountText}>Facebook</Text>
          {connectedAccounts.facebook ? (
            <TouchableOpacity
              style={styles.disconnectButton}
              onPress={() => handleDisconnect('facebook')}
            >
              <Text style={styles.disconnectButtonText}>Disconnect</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.notConnected}>Not Connected</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  accountText: {
    fontSize: 16,
  },
  disconnectButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  disconnectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notConnected: {
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ProfileScreen; 
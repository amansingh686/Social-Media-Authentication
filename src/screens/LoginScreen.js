import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_CONFIG, FACEBOOK_CONFIG } from '../constants/config';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  // Initialize Google Sign In
  GoogleSignin.configure({
    webClientId: GOOGLE_CONFIG.webClientId,
    iosClientId: GOOGLE_CONFIG.iosClientId,
    androidClientId: GOOGLE_CONFIG.androidClientId,
    offlineAccess: true,
    scopes: ['profile', 'email'],
  });

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      // Store user profile in AsyncStorage
      await AsyncStorage.setItem('userProfile', JSON.stringify({
        name: userInfo.user.name,
        email: userInfo.user.email,
        photoURL: userInfo.user.photo,
      }));
      
      navigation.replace('Dashboard');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setLoading(true);
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        Alert.alert('Error', 'Facebook login was cancelled');
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        Alert.alert('Error', 'Something went wrong obtaining access token');
        return;
      }

      // Get user profile data from Facebook
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${data.accessToken}`
      );
      const userData = await response.json();

      // Store user profile in AsyncStorage
      await AsyncStorage.setItem('userProfile', JSON.stringify({
        name: userData.name,
        email: userData.email,
        photoURL: userData.picture?.data?.url,
      }));
      
      navigation.replace('Dashboard');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to Social Media Auth</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.facebookButton]}
          onPress={handleFacebookSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen; 
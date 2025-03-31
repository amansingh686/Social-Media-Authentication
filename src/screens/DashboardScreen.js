import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadUserProfile();
    loadPosts();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem('userProfile');
      if (profile) {
        setUserProfile(JSON.parse(profile));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadPosts = async () => {
    // Simulated posts data
    const mockPosts = [
      {
        id: 1,
        platform: 'Facebook',
        content: 'Just shared a new photo!',
        timestamp: '2 hours ago',
        likes: 24,
        comments: 5,
      },
      {
        id: 2,
        platform: 'Google',
        content: 'Check out my latest update!',
        timestamp: '5 hours ago',
        likes: 15,
        comments: 3,
      },
    ];
    setPosts(mockPosts);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const renderPost = (post) => (
    <View key={post.id} style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: userProfile?.photoURL }}
          style={styles.postAvatar}
        />
        <View style={styles.postInfo}>
          <Text style={styles.postName}>{userProfile?.name}</Text>
          <Text style={styles.postPlatform}>{post.platform}</Text>
        </View>
        <Text style={styles.postTime}>{post.timestamp}</Text>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Like ({post.likes})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Comment ({post.comments})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={{ uri: userProfile?.photoURL }}
            style={styles.profileImage}
          />
          <Text style={styles.welcomeText}>
            Welcome, {userProfile?.name?.split(' ')[0]}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {posts.map(renderPost)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInfo: {
    flex: 1,
  },
  postName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postPlatform: {
    fontSize: 14,
    color: '#666',
  },
  postTime: {
    fontSize: 12,
    color: '#999',
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
  },
  actionText: {
    color: '#666',
    fontSize: 14,
  },
});

export default DashboardScreen; 
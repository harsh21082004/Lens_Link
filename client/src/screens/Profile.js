import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';

// Placeholder data for the photo grid - replace with user's actual posts
const userPosts = [
  { id: '1', uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' },
  { id: '2', uri: 'https://images.unsplash.com/photo-1542038784-56eD6b4b5758' },
  { id: '3', uri: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e' },
  { id: '4', uri: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1' },
  { id: '5', uri: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9' },
  { id: '6', uri: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6' },
  { id: '7', uri: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d' },
  { id: '8', uri: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e' },
];

const ProfileScreen = () => {
  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth);

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.post}>
      <Image source={{ uri: item.uri }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.username}>{user?.displayName || 'Username'}</Text>
            {/* Add settings icon/button here */}
            <TouchableOpacity>
                <Text style={{color: '#fff'}}>⚙️</Text>
            </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfoContainer}>
            <Image
                source={{ uri: user?.photoURL || 'https://placehold.co/100x100/141311/orange?text=AU' }}
                style={styles.avatar}
            />
            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statCount}>120</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statCount}>1.2M</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statCount}>345</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>
        </View>

        {/* Bio Section */}
        <View style={styles.bioContainer}>
            <Text style={styles.name}>{user?.displayName || 'User Name'}</Text>
            <Text style={styles.bio}>
                Capturing the world one frame at a time. 📸✨ {'\n'}DM for collaborations.
            </Text>
            <TouchableOpacity>
                <Text style={styles.link}>www.yourportfolio.com</Text>
            </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Share Profile</Text>
            </TouchableOpacity>
        </View>

        {/* Photo Grid */}
        <FlatList
          data={userPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false} // Disable FlatList scrolling since it's inside a ScrollView
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141311',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    username: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    profileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFA500',
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 10,
    },
    stat: {
        alignItems: 'center',
    },
    statCount: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#aaa',
        fontSize: 14,
    },
    bioContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    bio: {
        color: '#d3d3d3',
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
    },
    link: {
        color: '#FFA500',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#2b2931',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    post: {
        width: '32.5%',
        aspectRatio: 1, // Creates a square
        marginBottom: 5,
    },
    postImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
});

export default ProfileScreen;

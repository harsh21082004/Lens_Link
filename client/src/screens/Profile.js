import React, { useState } from 'react';
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
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { logout } from '../redux/services/authSlice';

// FIX: Provided unique IDs for all items in the placeholder array to resolve the "duplicate key" warning.
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
  { id: '10', uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e' },
  { id: '11', uri: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5' },
  { id: '12', uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e' },
  { id: '13', uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05' },
  { id: '14', uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e' },
  { id: '15', uri: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9' },
  { id: '16', uri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470' },
];

const ProfileScreen = () => {
  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('grid');


  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.post}>
      <Image source={{ uri: item.uri }} style={styles.postImage} />
    </TouchableOpacity>
  );

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingBottom: 85
      }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.username}>{user?.displayName || 'Username'}</Text>
          <TouchableOpacity>
            <Icon name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfoContainer}>
          <View style={styles.profile}>
            <Image
              source={{ uri: user?.photoURL || 'https://placehold.co/100x100/141311/orange?text=AU' }}
              style={styles.avatar}
            />
            <View style={styles.profileRight}>
              <Text style={styles.name}>{user?.displayName || 'User Name'}</Text>
              <Text style={styles.userId}>{user?.displayName || 'User Name'}</Text>
            </View>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>
              Capturing the world one frame at a time. 📸✨ {'\n'}DM for collaborations.
            </Text>
            <TouchableOpacity>
              <Text style={styles.link}>www.yourportfolio.com</Text>
            </TouchableOpacity>
          </View>
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
            <View style={styles.stat}>
              <Text style={styles.statCount}>4.8k</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(logout())}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.category}>
            <TouchableWithoutFeedback style={styles.categoryIcon} onPress={() => handleCategoryPress('grid')}>
              <Icon name={"grid"} size={24} color={activeCategory == "grid" ? "#FFA500" : "#fff"} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.categoryIcon} onPress={() => handleCategoryPress('film')}>
              <Icon name={"film"} size={24} color={activeCategory == "film" ? "#FFA500" : "#fff"} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.categoryIcon} onPress={() => handleCategoryPress('perm-contact-cal')}>
              <Icon1 name={"perm-contact-cal"} size={24} color={activeCategory == "perm-contact-cal" ? "#FFA500" : "#fff"} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* Action Buttons */}

        {/* Photo Grid */}
        <FlatList
          data={userPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false} // Disable FlatList scrolling since it's inside a ScrollView
          columnWrapperStyle={{ justifyContent: 'space-between'}}
          contentContainerStyle={{ paddingHorizontal: 5 }}
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
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#1c1c1e',
  },
  username: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userId: {
    color: 'gray',
    fontSize: 12
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  profileInfoContainer: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: '#1c1c1e',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
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
    marginTop: 10,
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
    marginTop: 20,
    marginBottom: 20,
    gap: 10
  },
  button: {
    flex: 1,
    backgroundColor: '#2b2931',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryIcon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#706c7cff',
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
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


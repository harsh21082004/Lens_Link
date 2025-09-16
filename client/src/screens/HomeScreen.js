import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image, ScrollView, FlatList } from 'react-native';

// import { useDispatch } from 'react-redux';
// import { logout } from '../redux/services/authSlice';
const userStory = [
  { id: '1', uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', name: 'John Doe' },
  { id: '2', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e', name: 'Jane Smith' },
  { id: '3', uri: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e', name: 'Bob Johnson' },
  { id: '4', uri: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1', name: 'Alice Brown' },
  { id: '5', uri: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9', name: 'Tom Wilson' },
  { id: '6', uri: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6', name: 'Emily Davis' },
  { id: '7', uri: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d', name: 'David Lee' },
  { id: '8', uri: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716', name: 'Sarah Miller' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e', name: 'Michael Clark' },
  { id: '10', uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', name: 'Jessica Taylor' },
  { id: '11', uri: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5', name: 'Christopher Anderson' },
  { id: '12', uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', name: 'Olivia Martinez' },
  { id: '13', uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', name: 'Daniel Wilson' },
  { id: '14', uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', name: 'Sophia Garcia' },
  { id: '15', uri: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9', name: 'Matthew Robinson' },
  { id: '16', uri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', name: 'Ava Martinez' },
];

const HomeScreen = () => {
  // const dispatch = useDispatch();
  const renderStory = ({ item }) => (
    <TouchableOpacity style={styles.otherStory}>
      <View style={styles.storyView}>
        <Image source={{ uri: item.uri }} style={styles.storyImage} />
      </View>
      <Text style={styles.storyText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
    </TouchableOpacity>
  );
  const renderLatestPost = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity style={styles.latestPost}>
        <View style={styles.latestPostView}>
          <Image source={{ uri: item.uri }} style={styles.latestPdstImage} />
        </View>
        <Text style={styles.latestPostText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
        <TouchableOpacity style={styles.latestPostDotIcon}>
          <View style={styles.dotIcon}></View>
          <View style={styles.dotIcon}></View>
          <View style={styles.dotIcon}></View>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.discriptionContainer}>
        <Text style={styles.discriptionText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
      </View>
      <View style={styles.postedImageContainer}>
        <Image source={{ uri: item.uri }} style={styles.postedImage} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.heartIcons}>
          <Icon name="heart" size={26} style={styles.icons} />
          <Text style={styles.iconsText}> 12K</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentIcon}>
          <Icon name="chatbox-ellipses" size={26} style={styles.icons} />
          <Text style={styles.iconsText}> 1.8K</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareIcon}>
          <Icon name="share-social-sharp" size={26} style={styles.icons} />
          <Text style={styles.iconText}> 2K</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveIcon}>
          <Icon name="save" size={26} style={styles.icons} />
          <Text style={styles.iconText}> 12</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
  return (
    // <View style={styles.container}>
    //   <TouchableOpacity onPress={() => dispatch(logout())}>
    //   <Text style={styles.text}>Home Screen</Text>
    //   </TouchableOpacity>
    // </View>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#090909ff'} />
      <ScrollView vertical={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.mainLogo}>
                <Image style={styles.logoImage} source={require('../assets/facebook.png')} />
              </View>
              <Text style={styles.mainText}>Lens</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerAdd}>
                <Icon name="add-circle" size={26} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerAdd}>
                <Icon name="notifications" size={26} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              <View style={styles.selfStory}>
                <View style={styles.story}>
                  <Image style={styles.profileImage} source={require('../assets/user.png')} />
                  <Icon name="add-circle" size={26} color="#74a9bbff" style={styles.addStory} />
                </View>
                <Text style={styles.storyText} numberOfLines={1} ellipsizeMode="tail">Your Story</Text>
              </View>
              <FlatList
                data={userStory}
                renderItem={renderStory}
                keyExtractor={(item) => item.id}
                //row
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // Add a gap of 10 between items

              />
            </ScrollView>
          </View>
          <View style={styles.latestPostContainer}>
            <FlatList
              data={userStory}
              renderItem={renderLatestPost}
              keyExtractor={(item) => item.id}
              //row
              vertical={true}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // Add a gap of 10 between items
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0d0dff',
  },
  headerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mainLogo: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
  logoImage: {
    height: '100%',
    width: '100%',
  },
  mainText: {
    color: '#f3f2efff',
    fontSize: 30,
    fontFamily: 'WorkSans-Regular',
    fontWeight: 'bold',
  },

  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  headerAdd: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#433f3fff',
  },
  storyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 120,
    width: '100%',
    gap: 15,

  },
  selfStory: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,

  },

  story: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2d3ce4ff',

  },
  storyImage: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },

  addStory: {
    position: 'absolute',
    fontSize: 24,
    bottom: -3,
    right: -6,
  },
  otherStory: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,

  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  storyText: {
    color: '#fffcfcff',
    fontSize: 15,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
    textAlign: 'center',
    maxWidth: 60,
  },
  storyView: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2de495ff',
  },
  latestPostContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 70,
    paddingHorizontal: 20,
  },
  postContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 500,
    width: '100%',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#f9ededff',
    paddingHorizontal: 10,
    gap: 10,
    marginBottom: 20,
  },
  latestPost: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
    padding: 6,
    backgroundColor: '#f9ededff',
    paddingHorizontal: 10,
    gap: 10,

  },
  latestPostView: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2de495ff',
  },
  latestPdstImage: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  latestPostText: {
    color: '#171616ff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  latestPostDotIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 'end',
    position: 'absolute',
    right: 10,
    top: 10,
    height: 40,
    width: 40,
    borderRadius: 10,
    gap: 3,

  },
  dotIcon: {
    height: 4,
    width: 4,
    borderRadius: 5,
    backgroundColor: '#7c7676ff',
  },
  discriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  discriptionText: {
    color: '#171616ff',
    fontSize: 15,
  },
  postedImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#821919ff',

  },
  postedImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    width: '100%',

  },
  heartIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  commentIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  shareIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  saveIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icons: {
    color: 'red',
  },

});


export default HomeScreen;

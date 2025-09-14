import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
// import { useDispatch } from 'react-redux';
import { logout } from '../redux/services/authSlice';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  // const dispatch = useDispatch();
  return (
    // <View style={styles.container}>
    //   <TouchableOpacity onPress={() => dispatch(logout())}>
    //   <Text style={styles.text}>Home Screen</Text>
    //   </TouchableOpacity>
    // </View>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#fcf9f9ff'} />
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.mainLogo}>
              <Image style={styles.logoImage} source={require('../assets/facebook.png')} />
            </View>
            <Text style={styles.mainText}>Lens Link</Text>
          </View>
          <View style={styles.headerRight}>
            <View></View>
            <View></View>
          </View>
        </View>
        <View>
          <View></View>
          <ScrollView>

          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f9ff',
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
    backgroundColor: '#c72525ff',
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
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  logoImage: {
    height: '100%',
    width: '100%',
  },
  mainText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'WorkSans-Regular',
    fontWeight: 'bold',
  },

  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
  }
});

export default HomeScreen;

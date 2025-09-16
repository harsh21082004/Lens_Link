import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';


// Icon assets
const icons = {
  Home: {
    inactive: require('../assets/home.png'),
    active: require('../assets/home.png'),
  },
  Explore: {
    active: require('../assets/compass.png'),
    inactive: require('../assets/compass.png'),
  },
  Notifications: {
    active: require('../assets/heart.png'),
    inactive: require('../assets/heart.png'),
  },
  Profile: {
    active: require('../assets/user.png'),
    inactive: require('../assets/user.png'),
  },
};

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (route, focused, size) => {
  const iconSource = focused
    ? icons[route.name]?.active
    : icons[route.name]?.inactive;

  if (focused) {
    return (
      <View style={styles.activeIconWrapper}>
        <View style={styles.activeIconBackground}>
          <Image
            source={iconSource}
            style={[
              styles.icon,
              {
                width: size,
                height: size,
                tintColor: '#FFA500',
              },
            ]}
          />
        </View>
        <View style={styles.activeUnderline} />
      </View>
    );
  }

  return (
    <Image
      source={iconSource}
      style={[
        styles.icon,
        {
          width: size,
          height: size,
          tintColor: 'rgba(255, 255, 255, 0.6)',
        },
      ]}
    />
  );
};

const AppNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // FIX: Removed hardcoded size; React Navigation provides this.
          tabBarIcon: ({ focused, size }) => renderTabBarIcon(route, focused, size),
          headerShown: false,
          tabBarLabelStyle: { display: 'none' },
          tabBarItemStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
          },
          tabBarStyle: {
            position: 'absolute',
            bottom: 10,
            elevation: 0,
            backgroundColor: 'transparent', 
            borderTopWidth: 0,
            borderRadius: 35,
            height: 65,
            overflow: 'hidden', 
            marginHorizontal: 10,
          },
          tabBarBackground: () => (
            <View style={styles.blurWrapper}>
              <BlurView
                blurType="light"
                blurAmount={50}
                style={StyleSheet.absoluteFill}
                downsampleFactor={10}
                overlayColor='rgba(2, 69, 65, 0.33)'
              />
            </View>)
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator >
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
  activeIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconBackground: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeUnderline: {
    marginTop: 8,
    width: 20,
    height: 3,
    backgroundColor: '#FFA500',
    borderRadius: 2,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 10,
    height: 65,
    marginHorizontal: 10,
    // Removed fixed height as it's not needed here
  },
  blurWrapper: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 35,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)', // Optional: slight tint
  },
});

export default AppNavigator;


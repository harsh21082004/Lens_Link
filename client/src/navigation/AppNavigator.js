import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image, View } from 'react-native';

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
          tintColor: 'gray',
        },
      ]}
    />
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => renderTabBarIcon(route, focused, size),
        headerShown: false,
        tabBarLabelStyle: { display: 'none' },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#2b2931',
          borderTopWidth: 0,
          borderRadius: 30,
          height: 80,
          paddingTop: 15,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
  activeIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  activeIconBackground: {
    backgroundColor: '#141311ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeUnderline: {
    marginTop: 6,
    width: 20,
    height: 3,
    backgroundColor: '#FFA500',
    borderRadius: 2,
  },
});

export default AppNavigator;

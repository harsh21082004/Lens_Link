import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { checkLoginStatus } from './src/redux/services/authSlice';
import { store } from './src/redux/store';

// A simple splash/loading screen
const SplashScreen = () => (
  <View style={styles.splashContainer}>
    <ActivityIndicator size="large" color="#FFA500" />
  </View>
);

const Main = () => {
  const { isLoggedIn, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check login status only once when the app loads
    dispatch(checkLoginStatus());
  }, [dispatch]);

  // Show a splash screen while checking auth status
  if (status === 'idle' || status === 'loading') {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Main />
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141311',
  }
});

export default App;

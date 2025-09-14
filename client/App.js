import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/redux/store';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { ActivityIndicator, View } from 'react-native';
import { checkLoginStatus } from './src/redux/services/authSlice';

// This is the most important line: It imports and runs your Google Sign-In configuration
// as soon as the app launches, preventing the "apiClient is null" error.
import './src/utils/GoogleSignIn';


const Main = () => {
  const { isLoggedIn, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);

  // Display a loading indicator while checking the user's login state.
  if (status === 'loading' || status === 'idle') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#141311' }}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
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

export default App;


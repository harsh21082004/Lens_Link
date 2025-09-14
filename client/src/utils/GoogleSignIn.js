// src/utils/googleSignIn.js
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '163532904964-qjfuvvo152h8kkpqkh1l4emrfi9l33pc.apps.googleusercontent.com', // from Firebase console
  offlineAccess: true,
  forceCodeForRefreshToken: true, // optional
  scopes: ['profile', 'email'],
});

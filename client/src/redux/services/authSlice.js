import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { saveUserToStorage, getUserFromStorage, removeUserFromStorage } from '../../utils/authStorage';
import axios from 'axios';

// IMPORTANT: For Android, use your machine's local network IP, not localhost.
const API_URL = "http://localhost:5000/api"; // Replace with your actual IP

const initialState = {
  user: null,
  token: null, // To store the JWT from your backend
  loading: false,
  error: null,
  isLoggedIn: false,
  status: 'idle',
}

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      // Step 1: Create the user in Firebase Auth for authentication services.
      await createUserWithEmailAndPassword(auth, email, password);
      
      // Step 2: Call your backend to create the user profile in MongoDB.
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      // The backend responds with the new user object from Mongo and a JWT.
      const { user, token } = response.data;
      
      // Step 3: Save the backend's response (your user profile and JWT) to local storage.
      await saveUserToStorage({ user, token });
      return { user, token };
    } catch (error) {
      // Handle errors from either Firebase or your backend.
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Step 1: Authenticate with Firebase.
      await signInWithEmailAndPassword(auth, email, password);
      
      // Step 2: Call your backend to get the user profile and a new JWT.
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { user, token } = response.data;
      
      // Step 3: Save your backend's response.
      await saveUserToStorage({ user, token });
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      // Step 1: Authenticate with Google and Firebase.
      await GoogleSignin.hasPlayServices();
      const googleUserInfo = await GoogleSignin.signIn();
      const idToken = googleUserInfo.data.idToken;
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      
      const firebaseUser = result.user;
      if (!firebaseUser) throw new Error('Could not get user from Firebase after Google Sign-In');

      console.log("Firebase user:", firebaseUser);

      const userDataForBackend = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };

      // Step 2: Send the Firebase user info to your backend to find or create a profile.
      const response = await axios.post(`http://10.171.133.69:5000/api/auth/social-login`, userDataForBackend);

      console.log("Backend response:", response)

      // Your backend responds with its own user object (from Mongo) and a JWT.
      const { user, token } = response.data;

      // Step 3: Save the data from YOUR backend.
      await saveUserToStorage({ user, token });
      return { user, token };
    } catch (error) {
      console.log("Google Sign In error:", error);
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error("Error during Google Sign Out cleanup:", error);
  }
  await removeUserFromStorage();
});

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLoginStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Retrieves { user, token } from storage.
      const data = await getUserFromStorage();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.status = 'idle';
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
        state.isLoggedIn = !!action.payload?.user;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      // This matcher now correctly handles the { user, token } payload
      // from all successful sign-in/sign-up thunks.
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') && (
          action.type.startsWith('auth/login') ||
          action.type.startsWith('auth/signUp') ||
          action.type.startsWith('auth/loginWithGoogle')
        ),
        (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.loading = false;
          state.status = 'succeeded';
        }
      );
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;


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


const initialState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  status: 'idle', // idle | loading | succeeded | failed
}

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: `${firstName} ${lastName}`,
        photoURL: user.photoURL || '',
      };

      await saveUserToStorage(userData);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
      };
      await saveUserToStorage(userData);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Google Sign In initiated");
      await GoogleSignin.hasPlayServices();
      // Get the full user info object for better debugging
      const userInfo = await GoogleSignin.signIn();
      console.log("Google User Info:", userInfo); 
      
      const idToken = userInfo.data.idToken;


      if (!idToken) throw new Error('No ID token returned from Google Sign-In');

      const googleCredential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      const user = result.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
      };
      await saveUserToStorage(userData);
      return userData;
    } catch (error) {
      console.log("Google Sign In error:", error)
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
  } catch (error) {
    console.error("Error during Google Sign Out (this is expected for non-Google users):", error);
  }
  await removeUserFromStorage();
});

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLoginStatus',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Checking login status...")
      const user = await getUserFromStorage();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Specific handlers first
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.status = 'idle';
      })
      .addCase(checkLoginStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = !!action.payload;
        state.status = 'succeeded';
      })
      // Generic matchers last
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
          if (action.type.startsWith('auth/checkLoginStatus')) {
            state.status = 'failed';
          }
        }
      )
      // FIX: Added 'loginWithGoogle' to this matcher to handle successful social logins.
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') && (
          action.type.startsWith('auth/login') ||
          action.type.startsWith('auth/signUp') ||
          action.type.startsWith('auth/loginWithGoogle')
        ),
        (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.loading = false;
          state.status = 'succeeded';
        }
      );
  },
});

export const { clearError, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;


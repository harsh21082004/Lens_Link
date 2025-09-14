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
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

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
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
  await removeUserFromStorage();
});

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLoginStatus',
  async (_, { rejectWithValue }) => {
    try {
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
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') && (action.type.startsWith('auth/login') || action.type.startsWith('auth/signUp')),
        (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.loading = false;
          state.status = 'succeeded';
        }
      );
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;


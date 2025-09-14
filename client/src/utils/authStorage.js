import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@lenslink_user';

export const saveUserToStorage = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.log('❌ Error saving user to storage', e);
  }
};

export const getUserFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.log('❌ Error reading user from storage', e);
    return null;
  }
};

export const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {
    console.log('❌ Error removing user from storage', e);
  }
};

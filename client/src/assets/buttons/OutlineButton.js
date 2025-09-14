import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const OutlineButton = ({ text, size = 16, borderRadius = 12, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
        <Text style={[styles.text, { fontSize: size }]}>
          {text}
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: width * 0.9, // 👈 90% of screen width
    height: 60,
    alignSelf: 'center', // center horizontally
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    color: '#fff',
    fontFamily: 'WorkSans-Regular',
    fontWeight: '600',
  },
});

export default OutlineButton;

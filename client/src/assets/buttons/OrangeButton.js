import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const OrangeButton = ({ text, size = 16, borderRadius = 12, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
      <LinearGradient
        colors={['#FFA726', '#FB8C00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { borderRadius }]}
      >
        <Text style={[styles.text, { fontSize: size }]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: width * 0.9, // 👈 90% of screen width
    height: 60,
    alignSelf: 'center', // center horizontally
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

export default OrangeButton;

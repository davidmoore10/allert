import { ActivityIndicator, Animated, Easing, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const LoadingScreen = () => {

	useFocusEffect(
		React.useCallback(() => {
			startImageRotate()
		}, [])
	);

    let rotateValueHolder = new Animated.Value(0);
	const startImageRotate = () => {
	  rotateValueHolder.setValue(0);
	  Animated.timing(rotateValueHolder, {
		toValue: 1,
		duration: 2000,
		easing: Easing.linear,
		useNativeDriver: false,
	  }).start(() => startImageRotate());
	};
  
	const RotateData = rotateValueHolder.interpolate({
	  inputRange: [0, 1],
	  outputRange: ['0deg', '360deg'],
	});

  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#0782f9"/>
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "transparent",
	},
})
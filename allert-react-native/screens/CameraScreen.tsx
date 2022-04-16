import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [cameraRef, setCameraRef] = useState<Camera | null>(null)
	const [type, setType] = useState(Camera.Constants.Type.back);
	
	//aspect ratio calculations
	const [imagePadding, setImagePadding] = useState(0);
	const [ratio, setRatio] = useState('4:3');  // default is 4:3
	const { height, width } = Dimensions.get('window');
	const screenRatio = height / width;
	const [isRatioSet, setIsRatioSet] =  useState(false);
  
	//on load, check camera permissions
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const setCameraReady = async() => {
		if (!isRatioSet) {
		  await prepareRatio();
		}
	};

	// set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = '4:3';  // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
		if (cameraRef) {

			const ratios = await cameraRef.getSupportedRatiosAsync();

			// Calculate the width/height of each of the supported camera ratios
			// These width/height are measured in landscape mode
			// find the ratio that is closest to the screen ratio without going over
			let distances = {};
			let realRatios = {};
			let minDistance = null;

			for (const ratio of ratios) {

				const parts = ratio.split(':');
				const realRatio: number = parseInt(parts[0]) / parseInt(parts[1]);
				realRatios[ratio] = realRatio;

				// ratio can't be taller than screen, so we don't want an abs()
				const distance = screenRatio - realRatio; 
				distances[ratio] = realRatio;
				
				if (minDistance == null) {
					minDistance = ratio;
				} else {
					if (distance >= 0 && distance < distances[minDistance]) {
					minDistance = ratio;
					}
				}
			}
			// set the best match
			desiredRatio = minDistance;
			//  calculate the difference between the camera width and the screen height
			const remainder = Math.floor(
			  (height - realRatios[desiredRatio] * width) / 2
			);
			// set the preview padding and preview ratio
			setImagePadding(remainder);
			setRatio(desiredRatio);
			// Set a flag so we don't do this 
			// calculation each time the screen refreshes
			setIsRatioSet(true);
		}
    }
  };
  
	if (hasPermission === null) {
	  	return <View />;
	}
	if (hasPermission === false) {
	  	return <Text>No access to camera</Text>;
	}
	return (
		<View style={styles.container}>
			<Camera
			style={styles.camera}
			ratio={ratio}
			type={type}
			onCameraReady={setCameraReady}
			ref={ref => {
				setCameraRef(ref)
			}}>
				<View style={styles.buttonContainer}>

					<TouchableOpacity
					style={styles.button}
					onPress={() => {
						setType(
						type === Camera.Constants.Type.back
							? Camera.Constants.Type.front
							: Camera.Constants.Type.back
						);
					}}>
						<Text style={styles.text}> Flip </Text>
					</TouchableOpacity>

					<TouchableOpacity style={{alignSelf: 'flex-end', backgroundColor: "red"}} onPress={async() => {
						if(cameraRef) {
							let photo = await cameraRef.takePictureAsync();
							console.log('photo', photo);
						}
					}}>
						<View style={styles.cameraButton}>
							<View style={styles.cameraButtonOutline}>
							</View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
					style={styles.button}
					onPress={() => {
						setType(
						type === Camera.Constants.Type.back
							? Camera.Constants.Type.front
							: Camera.Constants.Type.back
						);
					}}>
						<Text style={styles.text}> Flip </Text>
					</TouchableOpacity>

				</View>
			</Camera>
		</View>
	);
}

export default CameraScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 10,
	justifyContent: "space-between",
	alignItems: "flex-end",
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  cameraButton: {
	borderWidth: 2,
	borderRadius: 50,
	borderColor: 'white',
	height: 50,
	width:50,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
  },
  cameraButtonOutline: {
	borderWidth: 2,
	borderRadius: 50,
	borderColor: 'white',
	height: 40,
	width:40,
	backgroundColor: 'white',
  }
})
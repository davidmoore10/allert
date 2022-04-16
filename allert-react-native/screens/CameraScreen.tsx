import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform , Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () => {
	//image data
	const [image, setImage] = useState(null);

	//camera settigns and variables
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [cameraRef, setCameraRef] = useState<Camera | null>(null)
	const [type, setType] = useState(Camera.Constants.Type.back);
  
	//on load, check camera permissions
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result:any = await ImagePicker.launchCameraAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
	
		console.log(result);
	
		if (!result.cancelled) {
		  setImage(result.uri);
		}
	  };

	const captureImage = async () => {
	// No permissions request is necessary for launching the image library
	let result:any = await ImagePicker.launchCameraAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.All,
		allowsEditing: true,
		aspect: [4, 3],
		quality: 1,
	});

	console.log(result);

	if (!result.cancelled) {
		setImage(result.uri);
	}
	};

	return (
		<View style={styles.container}>

			<View style={styles.buttonContainer}>

				{image ? (
					<TouchableOpacity
					onPress={ () => {} }
					style={[styles.button, styles.buttonOutline]}
					>
						<Image source={{ uri: image }} style={{ width: 200, height: 200 }}/>
						<Text style={styles.buttonOutlineText}>Confirm Image</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
					onPress={ () => {} }
					style={[styles.button, styles.buttonOutline]}
					>
						<Text style={styles.buttonText}>No image</Text>
					</TouchableOpacity>
				)
				}

				<TouchableOpacity
				onPress={ pickImage }
				style={styles.button}
				>
					<Text style={styles.buttonText}>Capture Image</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={ captureImage }
				style={[styles.button, styles.buttonOutline]}
				>
					<Text style={styles.buttonOutlineText}>Choose from Gallery</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={ () => {} }
				style={[styles.button, styles.buttonOutline]}
				>
					<Text style={styles.buttonOutlineText}>Help</Text>
				</TouchableOpacity>
        	</View>
		</View>
	);
}

export default CameraScreen

const styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782f9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782f9",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#0782f9",
        fontWeight: "700",
        fontSize: 16,
    },
})
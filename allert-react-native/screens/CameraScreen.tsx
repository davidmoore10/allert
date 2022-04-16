import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform , Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';




const CameraScreen = () => {
	//image data
	const [image, setImage] = useState(null);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result:any = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  quality: 0.5,
		  base64: true,
		});
	
		console.log(result);
	
		if (!result.cancelled) {
		  setImage(result);
		}
	  };

	const captureImage = async () => {
	// No permissions request is necessary for launching the image library
	let result:any = await ImagePicker.launchCameraAsync({
		allowsEditing: true,
		quality: 0.5,
		base64: true,
	});

	console.log(result);

	if (!result.cancelled) {
		setImage(result);
	}
	};

	const getResultsFromApi = async () => {
		console.log("attempting to send image:")
		try {
			fetch("https://bid4tm2l7g.execute-api.eu-west-1.amazonaws.com/default", {
				method: 'POST',
				headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({
				"image64": image.base64,
    			"user_allergies": ["celery", "gluten", "milk"]
				}),
			}).then((response) => response.json())
			.then((responseJson) => {
			console.log(responseJson);
			})
		} catch (error) {
		  console.error(error);
		}
	  };

	return (
		<View style={styles.container}>

			<View style={styles.buttonContainer}>

				{image ? (
					<TouchableOpacity
					onPress={ getResultsFromApi }
					style={[styles.button, styles.buttonOutline]}
					>
						<Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }}/>
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
				onPress={ captureImage }
				style={styles.button}
				>
					<Text style={styles.buttonText}>Capture Image</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress={ pickImage }
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
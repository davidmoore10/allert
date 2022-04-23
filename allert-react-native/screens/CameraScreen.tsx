import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { auth, onAuthStateChanged } from '../firebase';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';


const CameraScreen = () => {
	//image data
	const [image, setImage] = useState(null);
	const [userFlags, setUserFlags] = useState(
		["celery","crustaceans","eggs","fish","gluten","lupin","milk","molluscs","mustard","nuts","sesame seeds","soybeans","sulphites"]
	);
	const [userData, setUserData]: any = useState(null);

    useFocusEffect(
		React.useCallback(() => {
			const unsubscribe = onAuthStateChanged(auth, user => {
				if (user) {
					setUserData(user)
					retrieveUserSettingsFromDatabase()
				}
				else {
					setUserData(null);
				}
			})
			return unsubscribe
		}, [auth.currentUser])
	);

	const pickImage = async () => {
		// Requires Permissions.MEDIA_LIBRARY on iOS 10 only.
		let result:any = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  quality: 0.6,
		  base64: true,
		});
	
		if (!result.cancelled) {
		  setImage(result);
		}
	  };

	const captureImage = async () => {
		// Requires Permissions.CAMERA. On Android and iOS 10 Permissions.CAMERA_ROLL is also required.
		let result:any = await ImagePicker.launchCameraAsync({
			quality: 0.6,
			base64: true,
		});

		if (!result.cancelled) {
			setImage(result);
		}
	};

	const getResultsFromApi = async () => {
		console.log("attempting to send image... searching for :", userFlags)
		try {
			fetch("https://bid4tm2l7g.execute-api.eu-west-1.amazonaws.com/default", {
				method: 'POST',
				headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({
				"image64": image.base64,
    			"user_allergies": userFlags,
				}),
			}).then((response) => response.json())
			.then((responseJson) => {
			console.log(responseJson);
			})
		} catch (error) {
		  console.error(error);
		}
	};

	const retrieveUserSettingsFromDatabase = () => {
		if (userData != null) {
			const db = getDatabase();
			const userId = auth.currentUser.uid;
			const reference = ref(db, "users/" + userId + "/userFlags");
	
			onValue(reference, (snapshot) => {
				const data = JSON.parse(snapshot.val());
				let result = Object.keys(data)
						.filter( key => data[key] != false )
						   .map(key => (
							key
						));
				setUserFlags(result);
			});
		}

		else {
			Alert.alert('No User Logged In!', 'All allergens are flagged in images by default. You must be logged in to change these settings from the user page.', [
				{
				  text: 'Cancel',
				  onPress: () => console.log('Cancel Pressed'),
				  style: 'cancel',
				},
			  ]);
		}
    }

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
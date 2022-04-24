import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { auth, onAuthStateChanged } from '../firebase';
import { getDatabase, ref, onValue, serverTimestamp, push } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';


const CameraScreen = ({navigation}) => {
	//image data
	const defaultFlags = ["celery","crustaceans","eggs","fish","gluten","lupin","milk","molluscs","mustard","nuts","sesame seeds","soybeans","sulphites"];
	const [image, setImage] = useState(null);
	const [userFlags, setUserFlags] = useState(defaultFlags);
	const [userData, setUserData]: any = useState(null);

    useFocusEffect(
		React.useCallback(() => {
			const unsubscribe = onAuthStateChanged(auth, user => {
				if (user) {
					setUserData(user)
					retrieveUserSettingsFromDatabase(user)
				}
				else {
					setUserData(null);
					setUserFlags(defaultFlags);
				}
			})
			return unsubscribe
		}, [])
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
				const result = JSON.parse(responseJson)
				updateUserHistoryInDatabase(auth.currentUser.uid, result)
				navigation.navigate("Image Results",
				{
					props:
						{
							"base64": "data:image/jpeg;base64," + image.base64,
							"results": result
						}
				})})
		} catch (error) {
		  console.error(error);
		}
	};

	const retrieveUserSettingsFromDatabase = (user) => {
			const db = getDatabase();
			const userId = user.uid;
			const reference = ref(db, "users/" + userId + "/userFlags");
	
			onValue(reference, (snapshot) => {
				
				const string = JSON.stringify(snapshot)
				const data = JSON.parse(string)
				let result = Object.keys(data)
						.filter( key => data[key] != false )
						   .map(key => (
							key
						));
				setUserFlags(result);
			});
    }

	const updateUserHistoryInDatabase = (userId: string, results: any)  => {
        const db = getDatabase();
        const reference = ref(db, 'users/' + userId + "/userHistory");
        push(reference,
			{
				"timestamp": serverTimestamp(),
				"results": results,
				"base64": "data:image/jpeg;base64," + image.base64,
			}
		);
    }

	return (
		<View style={styles.container}>

				<View style={styles.buttonContainer}>
					<View style={styles.imagePreviewContainer}>
						{ image ? (
							<TouchableOpacity
							onPress={ getResultsFromApi }
							style={styles.imagePreviewButton}
							>
								<Image source={{ uri: image.uri }} style={styles.imagePreview}/>
								<LinearGradient
								colors={[ 'rgba(255,255,255,0)', 'rgba(0,0,0,1)']}
								style={styles.textGradient}
								>
									<Text style={styles.imageButtonText}>Press to Confirm Image</Text>
								</LinearGradient>
							</TouchableOpacity>
						) : (
						<Text style={styles.imagePreviewText}>No Image</Text>
						)
						}
					</View>

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
				</View>

				<View style={styles.buttonContainer}>
					
				</View>

				<View style={styles.buttonContainer}>	
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
        alignItems: "center",
		justifyContent: "space-around",
    },
    buttonContainer: {
        width: "90%",
		maxHeight: "50%",
        alignItems: "center",
    },
    button: {
		backgroundColor: "#0782f9",
        width: "100%",
        padding: 15,
		margin: 5,
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
	pastelPurple: {
		backgroundColor: "#a972ca",
	},
	pastelRed: {
		backgroundColor: "#ff7f84",
	},
	imagePreviewContainer: {
        backgroundColor: "#c5c5c5",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		borderRadius: 15,
    },
	imagePreview: {
		width: '100%',
		height: '100%',
		borderRadius: 15,
    },
	imagePreviewButton: {
		height: "100%",
		width: "100%",
    },
	imagePreviewText: {
        fontSize: 20,
		color: "black",
		textAlign: "center",
		fontWeight: "bold",
    },
	imageButtonText: {
        fontSize: 20,
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
    },
	textGradient: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: "15%",
		justifyContent: "center",
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
    },
})
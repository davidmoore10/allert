import { Image, StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';

export default function HelpModalScreen({ navigation, route }) {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
                <Text style={styles.title}>
					For Best Results
				</Text>
				<Text style={styles.mainText}>
                    {"1. Ensure the camera is steady and the image is in focus.\n\n"}
                    {"2. Try to center the image on the ingredients to be scanned.\n\n"}
                    {"3. Bright lights can cause glare on product packaging. Try to avoid glare covering the ingredient text.\n\n"}
				</Text>
				<Text style={styles.title}>
					Allergen Flags & History
				</Text>
				<Text style={styles.mainText}>
					{"By default, all allergens will be flagged in scanned images automatically.\n\n"}
                    {"A user can change which allergens will be flagged on the User Settings page after logging in.\n\n"}
                    {"Users can view their previous scans and results from the User Page.\n\n"}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "transparent",
	},
	textContainer: {
		flex: 1,
		width: "90%",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	title: {
		color: "black",
		width: "100%",
        padding: 10,
		textAlign: "center",
		fontSize: 30,
		fontWeight: 'bold',
		backgroundColor: "transparent",
		borderBottomWidth: 0.5,
		borderColor: "#c5c5c5",
	},
	mainText: {
		color: "black",
		fontSize: 18,
		backgroundColor: "transparent",
	},
});

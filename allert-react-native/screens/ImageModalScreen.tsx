import { Image, StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';

export default function ImageModalScreen({ navigation, route }) {
	let image = route.params.props.base64 === undefined ? null : route.params.props.base64;
	let results = route.params.props.results === undefined ? null : route.params.props.results;
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: image }}
				style={styles.modalImage}
			/>
				{ results ? (
					<View style={styles.textContainer}>
					<Text style={styles.title}>
						{ "Allergens Flagged" }
					</Text>
					<Text style={styles.allergenText}>
						{ results.join(", ").replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()) }
					</Text>
				</View>
				) : (
					<View style={styles.textContainer}>
						<Text style={styles.allergenText}>
						No Allergens Flagged.
						</Text>
					</View>
				)
			}
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
		width: "100%",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	title: {
		color: "black",
		width: "100%",
		textAlign: "center",
		fontSize: 14,
		fontWeight: 'bold',
		backgroundColor: "transparent",
		borderBottomWidth: 0.5,
		borderColor: "#c5c5c5",
	},
	allergenText: {
		color: "black",
		fontSize: 24,
		fontWeight: 'bold',
		backgroundColor: "transparent",
		textAlign: "center",
	},
	modalImage: {
		width: 500,
		height: 500,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});

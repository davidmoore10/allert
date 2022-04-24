import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ImageModalScreen({ navigation, route }) {
  const image = route.params.props.base64;
  const results = route.params.props.results
  return (
    <View style={styles.container}>
      <Image
      source={{ uri: image }}
      style={styles.modalImage}
      />
      <Text style={{ fontSize: 30, color: "white" }}>
        { "This item contains: " + results.join(", ").replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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

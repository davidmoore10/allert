import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth, signOut } from '../firebase'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        signOut(auth).then(
            () => {
                console.log("Logged Out")
            })
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <TouchableOpacity
            onPress={ handleLogout }
            style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
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
    buttonOutlineText: {
        color: "#0782f9",
        fontWeight: "700",
        fontSize: 16,
    },
})
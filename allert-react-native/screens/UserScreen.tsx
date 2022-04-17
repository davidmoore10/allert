import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth, signOut } from '../firebase';
import React, { useState, useEffect }from 'react';
import { useNavigation } from '@react-navigation/native';

import Checkbox from 'expo-checkbox';

const UserScreen = () => {
    const [checkListState, setCheckListState] = useState([
            {
                "name": "celery",
                "enabled": false
            },
            {
                "name": "crustaceans",
                "enabled": false
            },
            {
                "name": "eggs",
                "enabled": false
            },
            {
                "name": "fish",
                "enabled": false
            },
            {
                "name": "gluten",
                "enabled": false
            },
            {
                "name": "lupin",
                "enabled": false
            },
            {
                "name": "milk",
                "enabled": false
            },
            {
                "name": "molluscs",
                "enabled": false
            },
            {
                "name": "mustard",
                "enabled": false
            },
            {
                "name": "nuts",
                "enabled": false
            },
            {
                "name": "sesame seeds",
                "enabled": false
            },
            {
                "name": "soybeans",
                "enabled": false
            },
            {
                "name": "sulphites",
                "enabled": false
            },
        ])

    const handleLogout = () => {
        signOut(auth).then(
            () => {
                console.log("Logged Out")
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>

            <View style={styles.buttonContainer}>
            {checkListState.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.checkbox, item.enabled ? {backgroundColor: "green"} : {backgroundColor:"red"}]}
                    onPress={ () => {setCheckListState(
                        checkListState.map((obj, i) => 
                            i === index ? 
                            {...obj, "enabled" : !item.enabled} 
                            : obj 
                    ))
                    }
                }
                >
                <Text>{item.name}</Text>
                </TouchableOpacity>
      ))}
                
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={ handleLogout }
                style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    checkbox: {
        margin: 8,
        width: "100%",
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
      },
})
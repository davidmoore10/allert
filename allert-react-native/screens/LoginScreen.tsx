import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then(
            userCredentials => {
                const user = userCredentials.user
                initializeUserInDatabase(user.uid);
                console.log("Registered with:", user.email)
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then(
            userCredentials => {
                const user = userCredentials.user
                console.log("Logged in with:", user.email)
            })
            .catch(error => alert(error.message))
    }

    
    const initializeUserInDatabase = (userId: string)  => {
        const db = getDatabase();
        const reference = ref(db, 'users/' + userId);
        push(reference, { userFlags:
            {
                "celery" : "false",
                "crustaceans" : "false",
                "eggs" : "false",
                "fish" : "false",
                "gluten" : "false",
                "lupin" : "false",
                "milk" : "false",
                "molluscs" : "false",
                "mustard" : "false",
                "nuts" : "false",
                "sesame seeds" : "false",
                "soybeans" : "false",
                "sulphites" : "false",
            }
        });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="height"
        >
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={ handleLogin }
            style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={ handleSignUp }
            style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>
                    Register
                </Text>
            </TouchableOpacity>
        </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

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
        width: "80%",
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
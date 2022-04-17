import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, onAuthStateChanged } from '../firebase';

import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';

const Stack = createNativeStackNavigator();



const UserStackScreen = () => {
    const [userData, setUserData]: any = useState(null);

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUserData(user);
            }
            else {
                setUserData(null);
            }
        })

        return unsubscribe
    }, [])

    return (
            <Stack.Navigator>
                {userData === null ? (
                // No user found, user isn't signed in
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                    title: 'Login',
                    headerShown: false,
                    }}
                />
                ) : (
                // User is signed in
                    <Stack.Screen
                        name="User"
                        component={UserScreen}
                        options={{headerShown: false}}
                        />
                )}
            </Stack.Navigator>   
    )
}

export default UserStackScreen

const styles = StyleSheet.create({})
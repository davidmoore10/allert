import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, onAuthStateChanged } from '../firebase';

import CameraScreen from './CameraScreen';
import ImageModalScreen from './ImageModalScreen';
import HelpModalScreen from './HelpModalScreen';

const Stack = createNativeStackNavigator();

const CameraStackScreen = () => {
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
                <Stack.Group>
                    <Stack.Screen
                        name="Camera"
                        component={CameraScreen}
                        options={{
                        title: 'Camera',
                        headerShown: false,
                        }}
                    />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen
                        name="Image Results"
                        component={ImageModalScreen}
                    />
                    <Stack.Screen
                        name="Help"
                        component={HelpModalScreen}
                    />
                </Stack.Group>
            </Stack.Navigator>   
    )
}

export default CameraStackScreen
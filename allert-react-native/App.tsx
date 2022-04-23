import * as React from 'react';
//navigation components
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//native react components
import { View, Text } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
//expo components
import { Ionicons, AntDesign } from '@expo/vector-icons';
//import screens
import UserStackScreen from './screens/UserStackScreen';
import CameraScreen from './screens/CameraScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }
  else return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            headerShown: false,
            title: "Camera",
            tabBarIcon: ( { color, size }) => (<Ionicons name="camera" color={color} size={size} /> ),
          }}
        />
        <Tab.Screen
          name="UserStack"
          component={UserStackScreen}
          options={{
            headerShown: false,
            title: "User Settings",
            tabBarIcon: ( { color, size }) => (<AntDesign name="user" color={color} size={size} /> ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
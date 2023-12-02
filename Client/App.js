import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import HomeLoged from "./src/screens/HomeLoged";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: headerStyle.header,
          headerTintColor: headerStyle.headerTitle.color,
          headerTitleStyle: headerStyle.headerTitle,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HomeLoged" component={HomeLoged} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const headerStyle = StyleSheet.create({
  header: {
    backgroundColor: 'rgb(32, 32, 36)', // Deep dark background with a touch of purple
  },
  headerTitle: {
    color: 'rgb(138, 43, 226)', // Purple text color
    fontWeight: 'bold',
  },
});

export default App;

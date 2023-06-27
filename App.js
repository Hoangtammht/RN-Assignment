import * as React from "react";
import { View, StyleSheet } from "react-native";

import MenuItems from "./components/MenuItems";
import WelcomeScreen from "./components/WelcomeScreen";
import UITab from "./components/tabBottom/UITab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="UITab"
      screenOptions={{headerStyle : { backgroundColor : '#FBDABB'}}}>
      {/* <Stack.Screen 
        name={'Login'}
        component={WelcomeScreen}
      /> */}
      <Stack.Screen name={'UITab'} component={UITab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  footerContainer: { backgroundColor: "#333333" },
});

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Login, Signup } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="Auth" component={AuthStackScreen} />
        <MainStack.Screen name="HomeScreen" component={HomeNavigation} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

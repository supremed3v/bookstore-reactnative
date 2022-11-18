import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Login, Signup } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { View, Text } from "react-native";

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
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  console.log(userToken);
  return (
    <AuthProvider>
      <NavigationContainer>
        {userToken ? (
          <MainStack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <MainStack.Screen name="Home" component={HomeNavigation} />

            <AuthStack.Screen name="Login" component={Login} />
          </MainStack.Navigator>
        ) : (
          <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Signup" component={Signup} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthProvider>
  );
}

import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Login, Signup } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { View, Text, ActivityIndicator } from "react-native";

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const HomeNavigation = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Home} />
    </Tab.Navigator>
  );
};

const AuthStackScreen = ({ navigation }) => {
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size={"large"}
          style={{ backgroundColor: "brown" }}
        />
      </View>
    );
  }
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName={userToken !== null ? "HomeScreen" : "Auth"}
          screenOptions={{ headerShown: false }}
        >
          <MainStack.Screen name="HomeScreen" component={HomeNavigation} />
          <MainStack.Screen name="Auth" component={AuthStackScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

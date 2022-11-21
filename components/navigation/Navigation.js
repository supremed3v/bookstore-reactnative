import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Login, Signup } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { View, Text, ActivityIndicator } from "react-native";
import { BookProvider } from "../context/BookContext";
import {
  MaterialIcons,
  AntDesign,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import BookView from "../screens/BookView";
import Reader from "../utils/Reader";

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const HomeNavigation = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#032924",
          height: 60,
          elevation: 40,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="dashboard"
              size={24}
              color={`${focused ? "#FFF" : "#0B8C7C"}`}
            />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={24}
              color={`${focused ? "#FFF" : "#0B8C7C"}`}
            />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name="favorite"
              size={22}
              color={`${focused ? "#FFF" : "#0B8C7C"}`}
            />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Options"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="reorder-three"
              size={45}
              color={`${focused ? "#FFF" : "#0B8C7C"}`}
            />
          ),
        }}
        component={Home}
      />
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
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: "transparent",
      primary: "#04332D",
      background: "#04332D",
      text: "#DBDBDB",
      buttonBg: "#665230",
      iconColor: "#0B8C7C",
    },
  };
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={customTheme.colors.primary} />
      </View>
    );
  }
  return (
    <AuthProvider>
      <BookProvider>
        <NavigationContainer theme={customTheme}>
          <MainStack.Navigator
            initialRouteName={userToken !== null ? "HomeScreen" : "Auth"}
            screenOptions={{ headerShown: false }}
          >
            <MainStack.Screen name="HomeScreen" component={HomeNavigation} />
            <MainStack.Screen name="Auth" component={AuthStackScreen} />
            <MainStack.Screen name="BookView" component={BookView} />
            <MainStack.Screen name="PdfReader" component={Reader} />
          </MainStack.Navigator>
        </NavigationContainer>
      </BookProvider>
    </AuthProvider>
  );
}

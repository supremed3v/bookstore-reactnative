import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const { logout, user } = useContext(AuthContext);
  console.log(user);
  const onLogout = () => {
    logout();
    navigation.navigate("Login");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={onLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

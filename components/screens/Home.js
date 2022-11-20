import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Form from "../utils/Form";
export default function Home() {
  const navigation = useNavigation();
  const { logout, user } = useContext(AuthContext);
  const onLogout = () => {
    logout();
    navigation.navigate("Login");
  };
  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 10 }}>
      {/* <Pressable onPress={onLogout}>
        <Text>Logout</Text>
      </Pressable> */}
      <Form />
    </View>
  );
}

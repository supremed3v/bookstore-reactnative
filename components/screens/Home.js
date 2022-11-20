import { View, Text, Pressable, ActivityIndicator, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { BookContext } from "../context/BookContext";
import CustomText from "../utils/CustomText";
export default function Home() {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const { isLoading, books } = useContext(BookContext);
  const onLogout = () => {
    logout();
    navigation.navigate("Auth");
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="brown" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 40 }}>
      <Pressable onPress={onLogout}>
        <Text>Logout</Text>
      </Pressable>
      {books?.map((book) => (
        <View key={book._id}>
          <CustomText text={book.title} size={24} weight={"600"} />
          <Text>Author:{book.author}</Text>
          <CustomText text={book.genre} size={24} />
          <View>
            <Image
              source={{ uri: book.cover }}
              style={{ width: 150, height: 150 }}
              resizeMode="contain"
            />
          </View>
        </View>
      ))}
    </View>
  );
}

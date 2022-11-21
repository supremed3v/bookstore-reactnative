import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { useNavigation } from "@react-navigation/native";

export default function BooksList({ item }) {
  const navigation = useNavigation();
  const onTap = () => {
    navigation.navigate("BookView", { item });
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={onTap}>
        <Image source={{ uri: item.cover }} style={styles.image} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 170,
    borderRadius: 20,
  },
  container: {
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 40,
  },
});

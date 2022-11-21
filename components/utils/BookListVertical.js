import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { useTheme } from "@react-navigation/native";

export default function BookListVertical({ item }) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: item.cover }} style={styles.image} />
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          marginBottom: 30,
        }}
      >
        <View>
          <CustomText text={item.title} size={20} weight={"700"} />
        </View>
        <View>
          <CustomText text={item.author} color={colors.iconColor} />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              backgroundColor: "#665230",
              color: "#F9C975",
              justifyContent: "center",
              alignItems: "center",
              height: 20,
              width: 70,
              textAlign: "center",
              marginTop: 10,
              borderRadius: 10,
              fontSize: 10,
              padding: 3,
            }}
          >
            {item.genre}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 170,
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

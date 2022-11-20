import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function Button({ title, onPress, onDisabled }) {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable onPress={onPress} disabled={onDisabled}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 30,
    backgroundColor: "brown",
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

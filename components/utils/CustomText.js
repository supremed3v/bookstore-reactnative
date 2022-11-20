import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function CustomText({ fontFamily, text, size, color, weight }) {
  return (
    <View>
      <Text
        style={{
          fontFamily: !fontFamily ? "Lato_400Regular" : fontFamily,
          fontSize: size,
          color: color,
          fontWeight: weight,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

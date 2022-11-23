import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function CustomText({ fontFamily, text, size, color, weight }) {
  const { colors } = useTheme();
  return (
    <View>
      <Text
        style={{
          fontFamily: !fontFamily ? "Lato_400Regular" : fontFamily,
          fontSize: size,
          color: !color ? colors.text : color,
          fontWeight: weight,
          width: 200,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

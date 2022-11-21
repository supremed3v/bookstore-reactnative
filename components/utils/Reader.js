import { Text, Modal, Pressable } from "react-native";
import React from "react";
import PdfReader from "rn-pdf-reader-js";
import { useNavigation } from "@react-navigation/native";

export default function Reader({ route, navigation: { goBack } }) {
  const navigation = useNavigation();
  const { book } = route.params;
  return (
    <Modal>
      <Pressable
        onPress={() => navigation.navigate("HomeScreen")}
        style={{ height: 40, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Close</Text>
      </Pressable>
      <PdfReader
        source={{ uri: book }}
        customStyle={{
          backgroundColor: "black",
        }}
      />
    </Modal>
  );
}

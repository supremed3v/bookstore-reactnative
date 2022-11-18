import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { InputOutline } from "react-native-input-outline";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(undefined);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputWrapper}>
        <InputOutline
          fontColor={"#000"}
          placeholder="Enter your email"
          fontSize={14}
          style={{ marginTop: 15 }}
          autoCorrect={false}
          keyboardAppearance="light"
          autoCapitalize="words"
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={emailError}
          activeColor={"brown"}
        />
        <InputOutline
          fontColor={"#000"}
          placeholder="Enter your password"
          fontSize={14}
          style={{ marginTop: 15 }}
          autoCorrect={false}
          keyboardAppearance="light"
          autoCapitalize="words"
          value={password}
          onChangeText={(text) => setPassword(text)}
          passwordRules={true}
          activeColor={"brown"}
        />
        <View style={styles.buttonWrapper}>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 40,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "60%",
  },
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

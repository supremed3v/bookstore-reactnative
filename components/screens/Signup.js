import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { InputOutline } from "react-native-input-outline";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASEURL } from "@env";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [nameError, setNameError] = useState(undefined);
  const [imageError, setImageError] = useState(undefined);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onRemoveImage = () => {
    setImage(null);
  };

  const onSignup = async () => {
    if (email === "") {
      setEmailError("Email is required");
    } else if (password === "") {
      setPasswordError("Password is required");
    } else if (name === "") {
      setNameError("Name is required");
    } else if (image === null) {
      setImageError("Image is required");
    } else {
      setEmailError(undefined);
      setPasswordError(undefined);
      setNameError(undefined);
      setImageError(undefined);
    }
    const data = {
      email,
      password,
      name,
      displayName: name,
      avatar: image,
    };
    await axios
      .post(`${BASEURL}/api/v1/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <View style={styles.inputWrapper}>
        <InputOutline
          fontColor={"#000"}
          placeholder="Enter your name"
          fontSize={14}
          style={{ marginTop: 15 }}
          autoCorrect={false}
          keyboardAppearance="light"
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => setName(text)}
          error={nameError}
          activeColor={"brown"}
        />
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
          error={passwordError}
        />
        <View>
          {!image && (
            <Pressable onPress={selectImage}>
              <Text>Upload Image</Text>
            </Pressable>
          )}
          {image && (
            <>
              <Image source={{ uri: image }} style={styles.image} />
              <Pressable onPress={onRemoveImage}>
                <Text>Remove Photo</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.buttonWrapper}>
          <Pressable onPress={() => onSignup()}>
            <Text style={styles.buttonText}>Signup</Text>
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
  image: {
    width: 100,
    height: 100,
  },
});

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";
import { InputOutline } from "react-native-input-outline";
import { CLOUDINARY_URL, BASEURL } from "@env";
import * as FileSystem from "expo-file-system";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import Button from "./Button";
import { AuthContext } from "../context/AuthContext";

export default function Form() {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    pdf: "",
    description: "",
    genre: "",
    author: "",
    cover: "",
    token: userToken,
  });
  const [image, setImage] = useState(null);
  const [doc, setDoc] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }

    let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
    let data = {
      file: base64Img,
      upload_preset: "spklivem",
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();
        console.log(data);
        setFormData({ ...formData, cover: data.url });
      })
      .catch((err) => console.log(err));
  };

  const selectPdf = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      base64: true,
    });
    console.log(result);
    if (!result.canceled) {
      setDoc(result.uri);
    }

    const options = { encoding: FileSystem.EncodingType.Base64 };

    const pdf = await FileSystem.readAsStringAsync(result.uri, options);

    let base64Img = `data:application/pdf;base64,${pdf}`;
    let data = {
      file: base64Img,
      upload_preset: "spklivem",
    };
    console.log(data);
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();
        console.log(data);
        setFormData({ ...formData, pdf: data.url });
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASEURL}/api/v1/book/new`, formData);
      console.log(res.data);
      setFormData({
        name: "",
        pdf: "",
        description: "",
        genre: "",
        author: "",
        cover: "",
      });
      doc && setDoc(null);
      image && setImage(null);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="brown" />
        <Text>Loading</Text>
      </View>
    );
  return (
    <>
      <Text style={styles.heading}>Add Book</Text>
      <View style={styles.container}>
        <InputOutline
          fontColor={"#000"}
          placeholder="Enter book title"
          fontSize={14}
          style={{ marginTop: 15 }}
          autoCorrect={false}
          keyboardAppearance="light"
          autoCapitalize="none"
          value={formData.name}
          onChangeText={(name) => setFormData({ ...formData, name })}
          // error={inputError}
          activeColor={"brown"}
        />
        <InputOutline
          fontColor={"#000"}
          placeholder="Enter description"
          fontSize={14}
          style={{ marginTop: 15 }}
          autoCorrect={false}
          keyboardAppearance="light"
          autoCapitalize="none"
          value={formData.description}
          onChangeText={(description) =>
            setFormData({ ...formData, description })
          }
          // error={inputError}
          activeColor={"brown"}
        />
        <InputOutline
          fontColor={"#000"}
          placeholder="Enter genre"
          fontSize={14}
          style={{ marginTop: 15 }}
          autoCorrect={false}
          keyboardAppearance="light"
          autoCapitalize="none"
          value={formData.genre}
          onChangeText={(genre) => setFormData({ ...formData, genre })}
          // error={inputError}
          activeColor={"brown"}
        />
        <InputOutline
          fontColor={"#000"}
          placeholder="Enter author name"
          fontSize={14}
          style={{ marginTop: 15 }}
          autoCorrect={false}
          keyboardAppearance="light"
          autoCapitalize="none"
          value={formData.author}
          onChangeText={(author) => setFormData({ ...formData, author })}
          // error={inputError}
          activeColor={"brown"}
        />
        <View>
          {image !== null ? (
            <Text style={{ color: "green" }}>Image selected</Text>
          ) : (
            <Button title={"Select Image"} onPress={selectImage} />
          )}
        </View>
        <View>
          {doc !== null ? (
            <Text style={{ color: "green" }}>Pdf selected</Text>
          ) : (
            <Button title={"Select Pdf"} onPress={selectPdf} />
          )}
        </View>
        <View>
          {formData.pdf === "" &&
          formData.cover === "" &&
          formData.author === "" &&
          formData.cover === "" &&
          formData.description === "" &&
          formData.genre === "" &&
          formData.name === "" ? (
            <Text
              style={{
                color: "red",
                marginTop: 20,
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Please fill all fields to submit
            </Text>
          ) : (
            <Button title={"Submit"} onPress={onSubmit} />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 50,
  },
  heading: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "left",
    color: "brown",
    marginTop: 40,
    letterSpacing: 1,
    marginLeft: 20,
    textDecorationLine: "underline",
  },
});

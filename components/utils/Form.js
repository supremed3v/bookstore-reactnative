import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { InputOutline } from "react-native-input-outline";
import { CLOUDINARY_URL } from "@env";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import Button from "./Button";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    pdf: "",
    description: "",
    genre: "",
    author: "",
    cover: "",
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
      setDoc(result.assets[0].base64);
    }

    let base64Img = `data:application/pdf;base64,${result.assets[0].base64}`;
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
        setFormData({ ...formData, pdf: data.url });
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = async () => {};
  console.log(formData);
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
          <Button title={"Select Image"} onPress={selectImage} />
        </View>
        <View>
          <Button title={"Select Book PDF"} onPress={selectPdf} />
        </View>
        <View>
          <Button title={"Add Book"} onPress={onSubmit} />
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

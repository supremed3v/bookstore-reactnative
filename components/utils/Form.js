import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { InputOutline } from "react-native-input-outline";
import { CLOUDINARY_URL, BASEURL } from "@env";
import * as FileSystem from "expo-file-system";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import Button from "./Button";
import { AuthContext } from "../context/AuthContext";
import CustomText from "./CustomText";

const GENRES = [
  { id: 1, item: "Fantasy" },
  { id: 2, item: "Horror" },
  { id: 3, item: "Romance" },
  { id: 4, item: "Sci-Fi" },
  { id: 5, item: "Thriller" },
  { id: 6, item: "Mystery" },
  { id: 7, item: "Drama" },
  { id: 8, item: "Comedy" },
  { id: 9, item: "Action" },
  { id: 10, item: "Adventure" },
  { id: 11, item: "Crime" },
  { id: 12, item: "Historical" },
  { id: 13, item: "Historical Fiction" },
  { id: 14, item: "Biography" },
  { id: 15, item: "Self-help" },
  { id: 16, item: "Technology" },
];

export default function Form() {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    pdf: "",
    description: "",
    genre: [],
    author: "",
    cover: "",
    token: userToken,
  });
  const [image, setImage] = useState(null);
  const [doc, setDoc] = useState(null);
  function pickGenre(selectedGenres) {
    if (selectedItems.includes(selectedGenres)) {
      setSelectedItems(
        selectedItems.filter((genres) => genres != selectedGenres)
      );
      return;
    }
    setSelectedItems((selectedItems) => selectedItems.concat(selectedGenres));
    setFormData({ ...formData, genre: selectedItems });
  }

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
    let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
    let data = {
      file: base64Img,
      upload_preset: "spklivem",
    };

    setLoading(true);
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        setLoading(true);
        let data = await r.json();
        setFormData({ ...formData, cover: data.url });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const selectPdf = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      base64: true,
    });
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
    setLoading(true);
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        setLoading(true);
        let data = await r.json();
        setFormData({ ...formData, pdf: data.url });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASEURL}/book/new`, formData);
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }

    setFormData({
      name: "",
      pdf: "",
      description: "",
      genre: "",
      author: "",
      cover: "",
      token: userToken,
    });
    doc && setDoc(null);
    image && setImage(null);
    selectedItems && setSelectedItems([]);
  };
  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="brown" />
        <Text>Loading</Text>
      </View>
    );

  return (
    <ScrollView>
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
        <CustomText text={"Select Genre"} weight={"700"} size={24} />
        <View style={styles.wrapper}>
          {GENRES.map((genre) => (
            <View
              key={genre.id}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Pressable
                onPress={() => pickGenre(genre.item)}
                style={
                  selectedItems.includes(genre.item)
                    ? styles.containerPrimary
                    : styles.containerSecondary
                }
              >
                <Text
                  style={
                    selectedItems.includes(genre.item)
                      ? styles.buttonText
                      : styles.buttonTextSecondary
                  }
                >
                  {genre.item}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
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
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={onSubmit}
                disabled={
                  loading && formData.image === "" && formData.pdf === ""
                    ? false
                    : true
                }
              >
                <Text style={styles.buttonTextSubmit}>Submit</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    marginVertical: 50,
    marginHorizontal: 10,
  },
  containerPrimary: {
    width: 110,
    backgroundColor: "#665230",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "#f3f3f3",
    marginHorizontal: 5,
    marginBottom: 10,
    flexDirection: "row",
    paddingLeft: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "left",
    color: "#FFf",
    marginTop: 40,
    letterSpacing: 1,
    marginLeft: 20,
    textDecorationLine: "underline",
  },
  wrapper: {
    marginLeft: -2,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    paddingVertical: 5,
    color: "#F9C975",
    fontWeight: "500",
    textAlign: "center",
  },

  containerSecondary: {
    width: 110,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "#f3f3f3",
    marginHorizontal: 5,
    marginBottom: 10,
    flexDirection: "row",
    paddingLeft: 10,
  },
  buttonTextSecondary: {
    fontSize: 16,
    paddingVertical: 5,
    color: "#000",
    fontWeight: "500",
    textAlign: "center",
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
  buttonTextSubmit: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

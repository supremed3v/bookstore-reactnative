import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import CustomText from "../utils/CustomText";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import PdfReader from "rn-pdf-reader-js";
import { useNavigation } from "@react-navigation/native";

export default function BookView({ route, navigation: { goBack } }) {
  const navigation = useNavigation();
  const { item } = route.params;
  console.log(item.title);
  const { colors } = useTheme();
  const book = item.pdf;
  const onRead = () => {
    navigation.navigate("PdfReader", { book });
  };

  return (
    <>
      <Pressable
        style={{ position: "absolute", top: 70, left: 10, zIndex: 444 }}
        onPress={() => goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
      </Pressable>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          marginVertical: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.cover }} style={styles.image} />
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <CustomText text={item.title} size={24} weight={"700"} />
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-share-social-sharp"
                style={{ paddingRight: 20 }}
                size={30}
                color={colors.iconColor}
              />
              <Fontisto name="favorite" size={30} color={colors.iconColor} />
            </View>
          </View>
          <View>
            <CustomText
              text={item.author}
              size={16}
              weight={"700"}
              color={colors.iconColor}
            />

            <Text style={styles.genreText}>{item.genre}</Text>
            <Text
              style={{
                color: colors.text,
                fontFamily: "Lato_400Regular",
                marginTop: 40,

                paddingBottom: 150,
              }}
            >
              {item.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButtonWrapper}>
        <Pressable style={styles.bottomButton} onPress={onRead}>
          <CustomText text={"Start Reading"} size={20} weight={"600"} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 20,
  },
  contentWrapper: {
    marginTop: 50,
  },
  titleWrapper: {
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  bottomButton: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 7,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtonWrapper: {
    backgroundColor: "#032924",
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    marginTop: 10,
  },
  genreText: {
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
  },
});

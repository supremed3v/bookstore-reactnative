import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import CustomText from "../utils/CustomText";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { BASEURL } from "@env";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookView({ route, navigation: { goBack } }) {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const { item } = route.params;
  const [isFav, setIsFav] = useState(false);
  const { colors } = useTheme();
  const book = item.pdf;
  const onRead = () => {
    navigation.navigate("PdfReader", { book });
  };

  const onFav = async () => {
    if (isFav) {
      setIsFav(false);
      await AsyncStorage.getItem("favourites").then((favourites) => {
        const favs = JSON.parse(favourites);
        const newFavs = favs.filter((fav) => fav._id !== item._id);
        AsyncStorage.setItem("favourites", JSON.stringify(newFavs));
        console.log(newFavs);
      });
    } else {
      setIsFav(true);
      await AsyncStorage.getItem("favourites").then((favourites) => {
        const favs = JSON.parse(favourites);
        favs.push(item);
        AsyncStorage.setItem("favourites", JSON.stringify(favs));
        console.log("favs", favs);
      });
    }
  };

  const asyncStorage = async () => {
    try {
      const favourites = await AsyncStorage.getItem("favourites");
      if (favourites !== null) {
        const favs = JSON.parse(favourites);
        const fav = favs.find((fav) => fav._id === item._id);
        if (fav) {
          setIsFav(true);
        }
      }
      console.log("favourites", favourites);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    asyncStorage();
  }, []);

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
              <Fontisto
                name="favorite"
                size={30}
                color={isFav ? colors.text : colors.iconColor}
                onPress={() => onFav()}
              />
            </View>
          </View>
          <View>
            <CustomText
              text={item.author}
              size={16}
              weight={"700"}
              color={colors.iconColor}
            />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {item.genre.map((genre) => (
                <Text key={genre} style={styles.genreText}>
                  {genre}
                </Text>
              ))}
            </View>
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

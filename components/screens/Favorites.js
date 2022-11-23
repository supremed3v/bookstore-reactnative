import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import CustomText from "../utils/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookListVertical from "../utils/BookListVertical";

export default function Favorites() {
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("favourites").then((favourites) => {
      const favs = JSON.parse(favourites);
      setFavourites(favs);
    });
    return () => {
      setFavourites([]);
    };
  }, []);

  const renderVertical = ({ item }) => <BookListVertical item={item} />;
  return (
    <ScrollView
      contentContainerStyle={{
        marginVertical: 10,
      }}
    >
      <View style={{ marginTop: 60, marginHorizontal: 10 }}>
        <CustomText text={"Liked Books"} size={30} weight={"700"} />
        <FlatList
          data={favourites}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderVertical}
        />
      </View>
    </ScrollView>
  );
}

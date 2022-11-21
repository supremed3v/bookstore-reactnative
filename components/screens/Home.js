import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { BookContext } from "../context/BookContext";
import CustomText from "../utils/CustomText";
import BooksList from "../utils/BooksList";
import BookListVertical from "../utils/BookListVertical";
export default function Home() {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const { isLoading, books } = useContext(BookContext);
  const [activeFilter, setActiveFilter] = useState("Best Sellers");
  const onFilterChange = (item) => {
    setActiveFilter(item);
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="brown" />
      </View>
    );
  }
  const renderItem = ({ item }) => <BooksList item={item} />;
  const renderVertical = ({ item }) => <BookListVertical item={item} />;
  console.log(books);
  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 40 }}>
      <View style={{ marginBottom: 10 }}>
        <CustomText text={"Book Spot"} size={30} weight={"700"} />
      </View>
      <View style={{ paddingTop: 5, paddingBottom: 5 }}>
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        <View style={{ marginTop: 20, marginBottom: 10, flexDirection: "row" }}>
          {["Best Sellers", "New Releases", "Coming Soon"].map(
            (item, index) => (
              <Pressable
                key={index}
                style={{
                  marginBottom: 10,
                  justifyContent: "space-between",
                  flex: 1,
                }}
                onPress={() => onFilterChange(item)}
              >
                <CustomText
                  text={item}
                  size={16}
                  weight={""}
                  color={`${activeFilter === item ? "#FFF" : "#0B8C7C"}`}
                />
              </Pressable>
            )
          )}
        </View>
        <FlatList
          data={books}
          renderItem={renderVertical}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}

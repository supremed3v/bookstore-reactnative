import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Text,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomText from "../utils/CustomText";

import { InputOutline } from "react-native-input-outline";
import { BookContext } from "../context/BookContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import BookListVertical from "../utils/BookListVertical";

export default function Search() {
  const { colors } = useTheme();
  const { books } = useContext(BookContext);
  const [query, setQuery] = useState("");
  const keys = ["title", "author", "genre"];
  const search = (data) => {
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.author.toLowerCase().includes(query.toLowerCase())
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 40,
      }}
    >
      <CustomText text={"Search"} />

      <InputOutline
        fontColor={"#000"}
        placeholder="Search..."
        fontSize={14}
        style={{ marginTop: 15 }}
        autoCorrect={false}
        keyboardAppearance="light"
        autoCapitalize="none"
        value={query}
        onChangeText={(text) => setQuery(text)}
        // error={inputError}
        activeColor={"brown"}
      />

      <SearchComponent data={search(books)} />
    </ScrollView>
  );
}

const SearchComponent = ({ data }) => {
  const navigation = useNavigation();
  const onTap = () => {
    navigation.navigate("BookView", { books });
  };
  console.log(data);
  const { colors } = useTheme();
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Pressable>
          <View>
            <Image
              source={{ uri: item.cover }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginBottom: 30,
            }}
          >
            <View>
              <CustomText text={item.title} size={20} weight={"700"} />
            </View>
            <View>
              <CustomText text={item.author} color={colors.iconColor} />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "row",
                width: "100%",
              }}
            >
              {item.genre.map((genre) => (
                <Text
                  style={{
                    backgroundColor: "#665230",
                    color: "#F9C975",
                    height: 20,
                    width: "auto",
                    textAlign: "center",
                    marginTop: 10,
                    borderRadius: 10,
                    fontSize: 10,
                    padding: 3,
                    flexWrap: "wrap",
                    flex: 1,
                  }}
                  key={genre}
                >
                  {genre}
                </Text>
              ))}
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 170,
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  container: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});

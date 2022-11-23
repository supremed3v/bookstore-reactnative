import { ScrollView, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import CustomText from "../utils/CustomText";

import { InputOutline } from "react-native-input-outline";
import { BookContext } from "../context/BookContext";
import BookListVertical from "../utils/BookListVertical";

export default function Search() {
  const { books } = useContext(BookContext);
  const [query, setQuery] = useState("");
  const search = (data) => {
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.author.toLowerCase().includes(query.toLowerCase()) ||
        item.genre.toLowerCase().includes(query.toLowerCase())
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
        activeColor={"brown"}
      />

      <SearchComponent data={search(books)} />
    </ScrollView>
  );
}

const SearchComponent = ({ data }) => {
  const renderItem = ({ item }) => <BookListVertical item={item} />;
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
    />
  );
};

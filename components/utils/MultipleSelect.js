import { View, Text } from "react-native";
import React, { useState } from "react";
import { xorBy } from "lodash";

import SelectBox from "react-native-multi-selectbox";

export default function MultipleSelect() {
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
    { id: 16, item: "Science & Technology" },
  ];
  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <View>
      <SelectBox
        label="Select Multiple Genre"
        options={GENRES}
        selectedValues={selectedItems}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
    </View>
  );
  function onMultiChange() {
    return (item) => setSelectedItems(xorBy(selectedItems, [item], "id"));
  }
}

import { View, Text } from "react-native";
import React, { useContext } from "react";
import CustomText from "../utils/CustomText";
import Button from "../utils/Button";
import { AuthContext } from "../context/AuthContext";

export default function Menu() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <View>
      <CustomText text={"Options"} />
      {user.role === "admin" && <Button title={"Admin"} />}
    </View>
  );
}

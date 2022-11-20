import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASEURL } from "@env";
import Cookie from "react-native-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASEURL}/api/v1/login`, {
        email,
        password,
      })
      .then((res) => {
        token = res.data.token;
        setUserToken(token);
        userData = res.data.user;
        setUser(userData);
        AsyncStorage.setItem("userToken", userToken);
        AsyncStorage.setItem("userInfo", JSON.stringify(user));
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setUser(null);
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let userInfo = await AsyncStorage.getItem("userInfo");
      setUserToken(userToken);
      setUser(JSON.parse(userInfo));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

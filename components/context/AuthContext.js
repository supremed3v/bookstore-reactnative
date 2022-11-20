import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASEURL } from "@env";

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
        setUserToken(res.data.token);
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

  const logout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.removeItem("userToken");
    setUserToken(null);
    setUser(null);
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUser(userInfo);
        setUserToken(userToken);
      }
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

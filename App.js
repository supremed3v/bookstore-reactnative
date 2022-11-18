import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { View } from "react-native";
import { AuthContext, AuthProvider } from "./components/context/AuthContext";
import Navigation from "./components/navigation/Navigation";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
        <StatusBar style="auto" />
      </AuthProvider>
    </>
  );
}

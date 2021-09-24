import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";

import Routes from "./routes";
import { colors } from "./config";

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor={colors.primary_dark}
        translucent
        barStyle={"light-content"}
      />
      <Routes logged={true} />
    </>
  );
}

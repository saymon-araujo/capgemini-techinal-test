import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import api from "../services/api";

export function Login() {
  async function HandleTestFunction() {
    api
      .get("/categories")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
      .finally(() => alert("Requisição terminada"));

    // api
    //   .post("/login", { username: "teste", password: "123456" })
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={HandleTestFunction}>
        <Text>Começemos</Text>
      </TouchableOpacity>
      <Icon name="shopping-cart" size={38} color={"red"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

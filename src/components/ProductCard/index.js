import React from "react";
import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import { colors, W } from "../../config";

export function ProductCard({ item }) {
  const navigation = useNavigation();

  function HandleNavigateToDetailsOfProduct() {
    navigation.navigate("Details", { item });
  }

  return (
    <RectButton
      style={styles.container}
      onPress={HandleNavigateToDetailsOfProduct}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>R$ {item.price}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    height: W / 2.3,
    width: W / 2.3,
    marginVertical: 20,
    borderRadius: 20,
    padding: 5,
  },
  title: {
    color: colors.white,
    fontSize: RFValue(15),
    textAlign: "center",
  },
  price: {
    color: colors.white,
    fontSize: RFValue(15),
    position: "absolute",
    bottom: 10,
    right: 20,
  },
});

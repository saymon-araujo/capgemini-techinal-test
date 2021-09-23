import React from "react";
import { Text, StyleSheet } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { colors, W } from "../../config";
import { RectButton } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/core";

export function ProductCard(item) {
  let data = item.item;

  const navigation = useNavigation();

  function HandleNavigateToDetailsOfProduct() {
    navigation.navigate("Details", { data });
  }

  return (
    <RectButton
      style={styles.container}
      onPress={HandleNavigateToDetailsOfProduct}
    >
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.price}>R$ {data.price}</Text>
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

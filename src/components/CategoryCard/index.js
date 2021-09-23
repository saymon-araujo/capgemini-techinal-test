import React from "react";
import { Text, StyleSheet } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { colors, W } from "../../config";
import { RectButton } from "react-native-gesture-handler";

export function CategoryCard(item) {
  let data = item.item;

  return (
    <RectButton style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    height: W / 3,
    width: W / 3,
    marginLeft: 20,

    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 14,
    paddingBottom: 5,
  },
  title: {
    color: colors.white,
    fontSize: RFValue(15),
  },
});

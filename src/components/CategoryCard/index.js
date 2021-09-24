import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import { colors, W } from "../../config";

export function CategoryCard({
  item,
  selectCategory,
  deselectCategory,
  selectedId,
}) {
  function verifyIfIsSelected() {
    if (selectedId === item.id) {
      deselectCategory();
    } else {
      selectCategory(item.id);
    }
  }

  return (
    <RectButton style={styles.container} onPress={verifyIfIsSelected}>
      <Text
        style={[
          styles.title,
          selectedId === item.id
            ? { color: colors.primary, paddingBottom: 2 }
            : {},
        ]}
      >
        {item.name}
      </Text>
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

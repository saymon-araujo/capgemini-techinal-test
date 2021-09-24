import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { colors, W } from "../../config";

export function SkeletonCategoryCards() {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.containerItem}>
        <SkeletonPlaceholder backgroundColor={colors.text_light} speed={1000}>
          <View style={styles.skeleton} />
        </SkeletonPlaceholder>
      </View>
      <View style={styles.containerItem}>
        <SkeletonPlaceholder backgroundColor={colors.text_light} speed={1000}>
          <View style={styles.skeleton} />
        </SkeletonPlaceholder>
      </View>
      <View style={styles.containerItem}>
        <SkeletonPlaceholder backgroundColor={colors.text_light} speed={1000}>
          <View style={styles.skeleton} />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: colors.dark,
    height: W / 3,
    width: W / 3,
    marginLeft: 20,

    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 14,
    paddingBottom: 5,
  },
  skeleton: {
    width: W / 4.5,
    height: RFValue(15),
    borderRadius: 4,
    alignSelf: "center",
  },
});

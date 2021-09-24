import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { colors, W } from "../../config";

export function SkeletonProductCard() {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      keyExtractor={(index) => String(index)}
      numColumns={2}
      columnWrapperStyle={styles.columnStyle}
      contentContainerStyle={styles.productsFlatlist}
      showsHorizontalScrollIndicator={false}
      renderItem={() => (
        <View style={styles.containerProduct}>
          <SkeletonPlaceholder backgroundColor={colors.text_light} speed={1000}>
            <View style={styles.titleSkeleton} />
          </SkeletonPlaceholder>

          <SkeletonPlaceholder backgroundColor={colors.text_light} speed={1000}>
            <View style={styles.priceSkeleton} />
          </SkeletonPlaceholder>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  containerProduct: {
    backgroundColor: colors.dark,
    height: W / 2.3,
    width: W / 2.3,
    marginVertical: 20,
    borderRadius: 20,
    padding: 5,
  },

  productsFlatlist: {
    alignSelf: "center",
    paddingBottom: 20,
  },
  columnStyle: {
    justifyContent: "space-evenly",
    width: W,
  },
  titleSkeleton: {
    width: W / 4,
    height: RFValue(15),
    borderRadius: 4,
    alignSelf: "center",
  },
  priceSkeleton: {
    width: W / 8,
    height: RFValue(15),
    borderRadius: 4,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: W / 5,
    right: 20,
  },
});

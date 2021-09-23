import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { colors, W, H } from "../config";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

import { useNavigation, useRoute } from "@react-navigation/core";

import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";

import Icon from "react-native-vector-icons/MaterialIcons";

export function Details() {
  const navigation = useNavigation();
  const route = useRoute();

  const data = route.params.data;

  console.log(data);

  function HandleGoBack() {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.header}
        source={{ uri: data.img }}
        imageStyle={{ opacity: 0.5 }}
      >
        <BorderlessButton onPress={HandleGoBack} style={styles.goBackButton}>
          <Icon name={"arrow-back"} color={colors.white} size={RFValue(40)} />
        </BorderlessButton>

        <Text style={styles.title}>{data.name}</Text>
      </ImageBackground>

      <View style={styles.body}>
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoWrapper}>
            <Text style={styles.subtitle}>Preço</Text>
            <Text style={styles.subtitleData}>R$ {data.price}</Text>
          </View>

          <View style={styles.productInfoWrapper}>
            <Text style={styles.subtitle}>Unidade</Text>
            <Text style={styles.subtitleData}>{data.unit}</Text>
          </View>
        </View>

        <View style={styles.productDescriptionContainer}>
          <Text style={styles.subtitle}>Descrição</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>

        <RectButton style={styles.buyButton}>
          <Icon
            name={"shopping-cart"}
            color={colors.white}
            size={RFValue(40)}
          />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_dark,
    paddingBottom: getBottomSpace(),
  },
  header: {
    height: H / 3.5 + getStatusBarHeight(),
    width: W,
    paddingTop: getStatusBarHeight(),
    backgroundColor: colors.dark,

    elevation: 10,

    justifyContent: "flex-end",
  },
  goBackButton: {
    position: "absolute",
    top: 15 + getStatusBarHeight(),
    left: 15,
  },
  title: {
    color: colors.white,
    fontSize: RFValue(30),
    textAlign: "center",
    marginBottom: 30,
  },
  body: {
    flex: 1,
    justifyContent: "space-evenly",
    // alignSelf: "center",
  },
  productInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  productInfoWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: RFValue(25),
    color: colors.text,
  },
  subtitleData: {
    fontSize: RFValue(15),
    color: colors.text_light,
  },
  productDescriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: RFValue(12),
    color: colors.text_light,
    width: W - RFValue(50),
  },
  buyButton: {
    backgroundColor: colors.dark,
    width: RFValue(60),
    height: RFValue(60),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(30),
    alignSelf: "flex-end",
    marginRight: RFValue(50),
  },
});

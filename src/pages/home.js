import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { useNavigation } from "@react-navigation/core";

import { colors, W, H } from "../config";
import { BorderlessButton } from "react-native-gesture-handler";

export function Home() {
  const navigation = useNavigation();

  function Logout() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quitanda do Zé</Text>
        <BorderlessButton onPress={Logout}>
          <Icon name={"logout"} color={colors.white} size={RFValue(30)} />
        </BorderlessButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    height: H * 0.1 + getStatusBarHeight(),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: getStatusBarHeight(),

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 24,
  },
  headerTitle: {
    color: colors.white,
    fontSize: RFValue(25),
    paddingLeft: 20,
  },
});

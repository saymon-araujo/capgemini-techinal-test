import React, { useState, createRef } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import api from "../services/api";
import { colors, W, H } from "../config";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputUsername = createRef();
  const inputPassword = createRef();
  const navigation = useNavigation();

  function HandleUserLogin() {
    if (username === "") {
      inputUsername.current.focus();
      return;
    } else if (password === "") {
      inputPassword.current.focus();
      return;
    } else {
      Keyboard.dismiss();
      setLoading(true);
      SendToEndpoint();

      return;
    }
  }
  function SendToEndpoint() {
    api
      .post("/login", { username, password })
      .then((response) => {
        if (response.data.success === true) {
          navigation.navigate("Home");
          setPassword("");
          setUsername("");
        } else {
          Alert.alert(response.data.msg, "Tente novamente");
        }
      })
      .catch(() => Alert.alert("Erro no envio", "Tente novamente"))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <Image
          source={require("../assets/img/react-icon.png")}
          style={styles.image}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.text_light}
          style={styles.loginInput}
          autoCorrect={false}
          autoCapitalize="none"
          ref={inputUsername}
          value={username}
          underlineColorAndroid="transparent"
          returnKeyType="next"
          onChangeText={(T) => setUsername(T)}
          onSubmitEditing={() => inputPassword.current.focus()}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor={colors.text_light}
          style={styles.loginInput}
          autoCorrect={false}
          value={password}
          ref={inputPassword}
          secureTextEntry
          autoCapitalize="none"
          returnKeyType="done"
          underlineColorAndroid="transparent"
          onChangeText={(T) => setPassword(T)}
          onSubmitEditing={HandleUserLogin}
        />
        <RectButton style={styles.loginButton} onPress={HandleUserLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
          {loading && (
            <ActivityIndicator
              color={colors.primary_light}
              style={styles.loading}
            />
          )}
        </RectButton>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  image: {
    width: RFValue(1280) * 0.11,
    height: RFValue(1280) * 0.11,
    marginBottom: 20,
  },
  loginInput: {
    backgroundColor: colors.white,
    width: W * 0.8,
    height: H / 15,
    marginVertical: 10,
    paddingLeft: 20,
    color: colors.text,

    borderRadius: 10,

    elevation: 6,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  loginButton: {
    backgroundColor: colors.white,
    width: W * 0.8,
    height: H / 15,
    marginTop: 30,

    borderRadius: 10,

    elevation: 6,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    justifyContent: "center",
  },
  loginButtonText: {
    color: colors.primary_light,
    fontSize: RFValue(17),
    textAlign: "center",
  },
  loading: {
    position: "absolute",
    right: 20,
  },
});

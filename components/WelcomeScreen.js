import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { isValidEmail, isValidPassword } from "../validation/Validation";

export default function WelcomeScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  return (
    <ScrollView indicatorStyle={"white"} style={styles.container}>
      <Image
        style={{ height: 100, width: 100, alignSelf: 'center' }}
        source={require("../images/icon.png")}
        resizeMode="center"
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
      />
      <Text style={styles.regularText}>Login to continue</Text>
      <View>
        <TextInput
          style={styles.inputBox}
          value={userName}
          onChangeText={(text) => {
            setErrorEmail(
              isValidEmail(text) == true ? "" : "Email is not format"
            );
            setUserName(text);
          }}
          placeholder={"Email....."}
          clearButtonMode={"always"}
        />
        <Text
          style={{
            color: "red",
            marginHorizontal: 20,
            fontSize: 12,
            marginBottom: 10,
          }}
        >
          {errorUser}
        </Text>
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={(text) => {
            setErrorPassword(
              isValidPassword(text) == true
                ? ""
                : "Password must be least 3 characters"
            );
            setPassword(text);
          }}
          secureTextEntry={true}
          placeholder={"Password....."}
        />
        <Text
          style={{
            color: "red",
            marginHorizontal: 20,
            fontSize: 12,
            marginBottom: 10,
          }}
        >
          {errorPassword}
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate('UITab')
          }}
        >
          <Text
            style={{
              padding: 8,
              fontSize: 15,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#EDEFEE",
  },
  loginButton: {
    backgroundColor: "#EE9972",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    alignSelf: "center",
    borderRadius: 25,
    marginTop: 15,
  },
});

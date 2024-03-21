import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import ScreenTemplate from "../components/ScreenTemplate";
import StyledInput from "../components/StyledInput";
import { api } from "../utils/api";
import { useAppDispatch } from "../redux/hook";
import { setAuth } from "../redux/features/auth/authSlice";
import FilledButton from "../components/buttons/FilledButton";
import { useNavigation } from "@react-navigation/native";
import { setProfile } from "../redux/features/profile/profileSlice";

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const loginDisabled = credentials.email === "" || credentials.password === "";

  const handleLogin = () => {
    // Add your login logic here
    api
      .post("/auth/login", credentials)
      .then((res) => {
        console.log(res.data);
        const { user, accessToken, profile } = res.data;
        dispatch(setAuth({ user, accessToken }));
        dispatch(
          setProfile({
            id: profile.id,
            username: profile.username,
            image: profile.image,
          })
        );
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <StyledInput
            keyboardType="email-address"
            label="Email"
            placeholder="Enter your email"
            value={credentials.email}
            onChangeText={(text) =>
              setCredentials({ ...credentials, email: text })
            }
          />

          <StyledInput
            label="Password"
            placeholder="Enter your password"
            secureText
            value={credentials.password}
            onChangeText={(text) =>
              setCredentials({ ...credentials, password: text })
            }
          />

          <Text style={styles.textRegular}>
            Forgot <Text style={styles.textEmphasized}>password?</Text>
          </Text>

          <Text style={styles.textRegular}>
            Need to create an account?{" "}
            <Text
              style={styles.textEmphasized}
              onPress={() => navigation.navigate("Register")}
            >
              Sign up
            </Text>
          </Text>
        </View>

        <FilledButton
          label="Login"
          disabled={loginDisabled}
          onPress={handleLogin}
        />
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  inputContainer: { flex: 1, justifyContent: "center" },
  button: {
    marginTop: 24,
    backgroundColor: "#00f29f",
    borderRadius: 4,
    height: 50,
    justifyContent: "center",
  },
  textRegular: {
    color: "white",
    marginBottom: 12,
    textAlign: "center",
  },
  textEmphasized: {
    color: "#00f29f",
  },
});

export default LoginScreen;

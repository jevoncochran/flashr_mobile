import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import ScreenTemplate from "../components/ScreenTemplate";
import StyledInput from "../components/StyledInput";
import { api } from "../utils/api";
import { useAppDispatch } from "../redux/hook";
import { setAuth } from "../redux/features/auth/authSlice";

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const loginDisabled = credentials.email === "" || credentials.password === "";

  const handleLogin = () => {
    // Add your login logic here
    api
      .post("/auth/login", credentials)
      .then((res) => {
        console.log(res.data);
        const { user, accessToken } = res.data;
        dispatch(setAuth({ user, accessToken }));
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
            type="email-address"
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
        </View>

        <Button
          mode="contained"
          disabled={loginDisabled}
          onPress={handleLogin}
          style={styles.button}
        >
          <Text variant="titleMedium">Login</Text>
        </Button>
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

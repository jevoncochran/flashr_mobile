import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import ScreenTemplate from "../components/ScreenTemplate";
import StyledInput from "../components/StyledInput";
import { api } from "../utils/api";
import { useAppDispatch } from "../redux/hook";
import { setAuth } from "../redux/features/auth/authSlice";
import FilledButton from "../components/buttons/FilledButton";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);

  //   const loginDisabled =
  //     credentials.email === "" ||
  //     credentials.password === "" ||
  //     credentials.password !== credentials.passwordConfirm ||
  //     passwordsMatchError;

  const handleSignUp = () => {
    // Check if passwords match
    if (credentials.password !== credentials.passwordConfirm) {
      setPasswordsMatchError(true);
      console.log("password match error set");
      return;
    }

    const { email, password } = credentials;
    api
      .post("/auth/register", { email, password })
      .then((res) => {
        console.log(res.data);
        const { user, accessToken } = res.data;
        dispatch(setAuth({ user, accessToken }));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("credentials: ", credentials);
  }, [credentials]);

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

          <StyledInput
            label="Confirm password"
            placeholder="Confirm your password"
            secureText
            value={credentials.passwordConfirm}
            onChangeText={(text) =>
              setCredentials({ ...credentials, passwordConfirm: text })
            }
            error={passwordsMatchError}
            errorMessage={
              passwordsMatchError ? "Passwords do not match" : undefined
            }
          />

          <Text style={styles.textRegular}>
            Already have an account?{" "}
            <Text
              style={styles.textEmphasized}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>

        <FilledButton
          label="Sign up"
          //   disabled={loginDisabled}
          onPress={handleSignUp}
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
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 8,
  },
});

export default SignUpScreen;

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../../screens/LoginScreen";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import DecksScreen from "../../screens/DecksScreen";

type Props = {};

const StackNavigator = (props: Props) => {
  const auth = useAppSelector((state: RootState) => state.auth);

  const isAuthenticated = auth.accessToken !== null;

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Decks" component={DecksScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

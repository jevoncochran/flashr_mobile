import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../../screens/LoginScreen";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import DecksScreen from "../../screens/DecksScreen";
import TabNavigator from "./TabNavigator";
import DeckScreen from "../../screens/DeckScreen";
import PracticeScreen from "../../screens/PracticeScreen";
import BuildDeckScreen from "../../screens/BuildDeckScreen";
import ResultScreen from "../../screens/ResultScreen";

const StackNavigator = () => {
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
          <>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Home" component={DecksScreen} />
            <Stack.Screen name="Deck" component={DeckScreen} />
            <Stack.Screen name="Practice" component={PracticeScreen} />
            <Stack.Screen name="Build" component={BuildDeckScreen} />
            <Stack.Screen name="Results" component={ResultScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

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
          <>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Decks" component={DecksScreen} />
            <Stack.Screen name="Deck" component={DeckScreen} />
            <Stack.Screen name="Practice" component={PracticeScreen} />
            <Stack.Screen name="Build" component={BuildDeckScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

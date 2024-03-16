import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppTheme } from "../../theme/theme";
import DecksScreen from "../../screens/DecksScreen";
import {
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text } from "react-native-paper";
import ProfileScreen from "../../screens/ProfileScreen";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { useAppDispatch } from "../../redux/hook";
import { setDeckBuildType } from "../../redux/features/deck/deckSlice";
import BuildDeckScreen from "../../screens/BuildDeckScreen";

type Props = {};

const TabNavigator = (props: Props) => {
  const Tab = createBottomTabNavigator();

  const navigation = useNavigation();
  const theme = useAppTheme();

  const dispatch = useAppDispatch();

  const getTabBarIcon = (
    route: RouteProp<ParamListBase, string>,
    size: number,
    color: string,
    activeColor: string,
    active: boolean
  ) => {
    switch (route.name) {
      case "Home":
        return (
          <FontAwesome
            name="search"
            size={size}
            color={active ? activeColor : color}
          />
        );
      case "Solutions":
        return (
          <FontAwesome6
            name="book"
            size={size}
            color={active ? activeColor : color}
          />
        );
      case "Build":
        return (
          <MaterialIcons
            name="add-circle-outline"
            size={32}
            color={active ? activeColor : color}
            onPress={() => {
              dispatch(setDeckBuildType("create"));
              navigation.navigate("Build");
            }}
          />
        );
      case "Library":
        return (
          <AntDesign
            name="folderopen"
            size={size}
            color={active ? activeColor : color}
          />
        );
      case "Profile":
        return (
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={size}
            color={active ? activeColor : color}
          />
        );
    }
  };

  // TODO: There's a distinction being made between the icon and the rest of the "tab"
  // Clicking the icon sets deckBuildType as "create"
  // Clicking under the icon does not
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundBlue,
          height: 100,
          justifyContent: "center",
          display: route.name !== "Build" ? "flex" : "none",
        },
        tabBarLabel: ({ focused }) =>
          route.name === "Build" ? null : (
            <Text
              style={{
                color: focused
                  ? theme.colors.primary
                  : theme.colors.tertiaryLight,
              }}
            >
              {route.name}
            </Text>
          ),
        tabBarIcon: ({ size, color, focused }) => {
          return getTabBarIcon(
            route,
            26,
            theme.colors.tertiaryLight,
            theme.colors.primary,
            focused
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DecksScreen} />
      <Tab.Screen name="Solutions" component={DecksScreen} />
      <Tab.Screen name="Build" component={BuildDeckScreen} />
      <Tab.Screen name="Library" component={DecksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

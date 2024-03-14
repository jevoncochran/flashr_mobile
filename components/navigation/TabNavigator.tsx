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
import { ParamListBase, RouteProp } from "@react-navigation/native";

type Props = {};

const TabNavigator = (props: Props) => {
  const Tab = createBottomTabNavigator();

  const theme = useAppTheme();

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
      case "Create-Deck":
        return (
          <MaterialIcons
            name="add-circle-outline"
            size={32}
            color={active ? activeColor : color}
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

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundBlue,
          height: 100,
          justifyContent: "center",
        },
        tabBarLabel: ({ focused }) =>
          route.name === "Create-Deck" ? null : (
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
      <Tab.Screen name="Create-Deck" component={DecksScreen} />
      <Tab.Screen name="Library" component={DecksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

interface Props {
  children: JSX.Element;
}

const ScreenTemplate = ({ children }: Props) => {
  return (
    <LinearGradient colors={["#243765", "#090D38"]} style={styles.gradient}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default ScreenTemplate;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
  },
});

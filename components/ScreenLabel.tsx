import React from "react";
import { Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";
import { View, StyleSheet } from "react-native";

interface Props {
  label: string;
}

const ScreenLabel = ({ label }: Props) => {
  const theme = useAppTheme();

  return (
    <View style={styles.labelContainer}>
      <Text variant="displayMedium" style={{ color: theme.colors.primary }}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 32,
  },
});

export default ScreenLabel;

import React from "react";
import { Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";
import { View, StyleSheet } from "react-native";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

interface Props {
  label: string;
  variant?: VariantProp<never> | undefined;
  marginBottom?: number;
}

const ScreenLabel = ({
  label,
  variant = "displaySmall",
  marginBottom = 32,
}: Props) => {
  const theme = useAppTheme();

  return (
    <View style={{ marginBottom }}>
      <Text variant={variant} style={{ color: theme.colors.primary }}>
        {label}
      </Text>
    </View>
  );
};

export default ScreenLabel;

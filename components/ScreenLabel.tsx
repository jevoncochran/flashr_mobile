import React from "react";
import { Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";
import { View } from "react-native";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

interface Props {
  label: string;
  variant?: VariantProp<never> | undefined;
  marginBottom?: number;
  textAlign?: "left" | "auto" | "right" | "center" | "justify";
}

const ScreenLabel = ({
  label,
  variant = "displaySmall",
  marginBottom = 32,
  textAlign = "left",
}: Props) => {
  const theme = useAppTheme();

  return (
    <View style={{ marginBottom }}>
      <Text
        variant={variant}
        style={{ color: theme.colors.primary, textAlign }}
      >
        {label}
      </Text>
    </View>
  );
};

export default ScreenLabel;

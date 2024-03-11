import React from "react";
import { Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";

interface Props {
  label: string;
}

const ScreenLabel = ({ label }: Props) => {
  const theme = useAppTheme();

  return (
    <Text variant="displayMedium" style={{ color: theme.colors.primary }}>
      {label}
    </Text>
  );
};

export default ScreenLabel;

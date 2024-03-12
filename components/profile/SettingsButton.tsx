import { useAppTheme } from "../../theme/theme";
import { Button, Text } from "react-native-paper";
import { GestureResponderEvent, StyleSheet } from "react-native";

interface Props {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
}

const SettingsButton = ({ label, onPress }: Props) => {
  const theme = useAppTheme();

  return (
    <Button
      style={[styles.button, { borderColor: theme.colors.primary }]}
      onPress={onPress}
    >
      <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
        {label}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    padding: 0,
  },
});

export default SettingsButton;

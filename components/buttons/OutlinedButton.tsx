import { useAppTheme } from "../../theme/theme";
import { Button, Text } from "react-native-paper";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Props {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  disabled?: boolean;
}

const OutlinedButton = ({ label, onPress, disabled }: Props) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Button style={[styles.button, { borderColor: theme.colors.primary }]}>
        <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
          {label}
        </Text>
      </Button>
    </TouchableOpacity>
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

export default OutlinedButton;

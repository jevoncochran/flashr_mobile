import { Button, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const FilledButton = ({ label, onPress, disabled }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Button mode="contained" disabled={disabled} style={styles.button}>
        <Text variant="titleLarge">{label}</Text>
      </Button>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00f29f",
    borderRadius: 4,
    height: 50,
    justifyContent: "center",
  },
});

export default FilledButton;

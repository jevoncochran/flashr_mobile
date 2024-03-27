import { View, StyleSheet, GestureResponderEvent } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAppTheme } from "../../theme/theme";
import { Entypo } from "@expo/vector-icons";

interface Props {
  label: string;
  subtext?: string;
  icon?: JSX.Element;
  onPress: (e: GestureResponderEvent) => void;
}

const ScreenButton = ({ label, subtext, icon, onPress }: Props) => {
  const theme = useAppTheme();
  return (
    <Button
      style={[styles.button, { borderColor: theme.colors.tertiary }]}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <View style={styles.buttonLeft}>
          {icon ? icon : null}
          <View style={styles.textContainer}>
            <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
              {label}
            </Text>
            {subtext && (
              <Text style={{ color: theme.colors.tertiary }}>{subtext}</Text>
            )}
          </View>
        </View>

        <View style={styles.buttonRight}>
          <Entypo name="chevron-right" size={32} color={theme.colors.primary} />
        </View>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    padding: 0,
    marginBottom: 16,
  },
  buttonContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  buttonRight: {
    justifyContent: "center",
  },
  textContainer: {
    gap: 8,
  },
});

export default ScreenButton;

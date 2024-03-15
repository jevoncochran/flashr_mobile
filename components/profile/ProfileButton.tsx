import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAppTheme } from "../../theme/theme";
import { Entypo } from "@expo/vector-icons";

interface Props {
  label: string;
  icon: JSX.Element;
}

const ProfileButton = ({ label, icon }: Props) => {
  const theme = useAppTheme();
  return (
    <Button style={[styles.button, { borderColor: theme.colors.tertiary }]}>
      <View style={styles.buttonContent}>
        <View style={styles.buttonLeft}>
          {icon}
          <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
            {label}
          </Text>
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
    height: 60,
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
});

export default ProfileButton;

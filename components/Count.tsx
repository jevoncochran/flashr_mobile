import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";

interface Props {
  type: "correct" | "incorrect";
  count: number;
}

const Count = ({ type, count }: Props) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <Text
        variant="bodyLarge"
        style={[
          styles.text,
          {
            color:
              type === "correct" ? theme.colors.secondary : theme.colors.danger,
          },
        ]}
      >
        {type === "correct" ? "Know" : "Still learning"}
      </Text>
      <View>
        <View
          style={[
            styles.countContainer,
            {
              borderColor:
                type === "correct"
                  ? theme.colors.secondary
                  : theme.colors.danger,
            },
          ]}
        >
          <Text
            variant="bodyLarge"
            style={[
              styles.text,
              {
                color:
                  type === "correct"
                    ? theme.colors.secondary
                    : theme.colors.danger,
              },
            ]}
          >
            {count}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between" },
  countContainer: {
    borderWidth: 2,
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontWeight: "bold" },
});

export default Count;

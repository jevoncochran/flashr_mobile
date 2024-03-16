import { Surface, Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";

interface Props {
  count: number;
  type: "correct" | "incorrect";
}

const Score = ({ count, type }: Props) => {
  const theme = useAppTheme();

  return (
    <Surface
      style={{
        width: 42,
        height: 42,
        borderWidth: 2,
        borderLeftWidth: type === "correct" ? 2 : 0,
        borderRightWidth: type === "correct" ? 0 : 2,
        borderColor:
          type === "correct" ? theme.colors.secondary : theme.colors.danger,
        borderRadius: 16,
        borderTopLeftRadius: type === "correct" ? 16 : 0,
        borderBottomLeftRadius: type === "correct" ? 16 : 0,
        borderTopRightRadius: type === "correct" ? 0 : 16,
        borderBottomRightRadius: type === "correct" ? 0 : 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        variant="titleLarge"
        style={{
          color:
            type === "correct" ? theme.colors.secondary : theme.colors.danger,
          fontWeight: "800",
        }}
      >
        {count}
      </Text>
    </Surface>
  );
};

export default Score;

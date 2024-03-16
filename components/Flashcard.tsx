import { Card as PaperCard, Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";
import FlipCard from "react-native-flip-card";
import { Card } from "../types";
import { StyleSheet } from "react-native";

interface Props {
  card: Card;
}

const Flashcard = ({ card }: Props) => {
  const theme = useAppTheme();

  return (
    <FlipCard
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.colors.secondary,
        },
      ]}
      flipHorizontal={true}
      flipVertical={false}
      friction={10}
    >
      <PaperCard
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.secondary,
          },
        ]}
      >
        <Text
          variant="headlineLarge"
          style={[styles.text, { color: theme.colors.backgroundBlue }]}
        >
          {card.front}
        </Text>
      </PaperCard>
      <PaperCard
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.secondary,
          },
        ]}
      >
        <Text
          variant="headlineLarge"
          style={[styles.text, { color: theme.colors.backgroundBlue }]}
        >
          {card.back}
        </Text>
      </PaperCard>
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  card: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { textAlign: "center" },
});

export default Flashcard;

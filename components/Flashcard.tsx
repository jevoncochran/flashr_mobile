import { Card as PaperCard, Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";
import FlipCard from "react-native-flip-card";
import { Card } from "../types";
import { StyleSheet, Dimensions } from "react-native";

interface Props {
  card: Card;
}

const Flashcard = ({ card }: Props) => {
  const theme = useAppTheme();

  const windowWidth = Dimensions.get("window").width;

  return (
    <FlipCard
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.colors.secondary,
          width: windowWidth - 48, 
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
    flexGrow: 1,
    flex: 1,
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

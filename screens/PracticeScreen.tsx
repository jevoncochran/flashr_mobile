import { useEffect, useState } from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/buttons/BackButton";
import { api } from "../utils/api";
import { useAccessToken } from "../utils/useAccessToken";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../theme/theme";
import Score from "../components/Score";
import Flashcard from "../components/Flashcard";

const PracticeScreen = () => {
  const accessToken = useAccessToken();
  const theme = useAppTheme();

  const selectedDeck = useAppSelector(
    (state: RootState) => state.deck.selectedDeck
  );

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [cards, setCards] = useState(selectedDeck?.cards);

  useEffect(() => {
    api
      .post(`/views`, { deckId: selectedDeck?.id }, accessToken)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err.response.data.message);
      });
  }, []);

  return (
    <ScreenTemplate>
      <>
        <BackButton />

        <View style={styles.scoreContainer}>
          <Score type="incorrect" count={incorrectCount} />
          <Score type="correct" count={correctCount} />
        </View>

        <View style={styles.cardContainer}>
          <Flashcard card={cards[0]} />
        </View>
      </>
    </ScreenTemplate>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: -16,
  },
  cardContainer: {
    width: "100%",
    flexGrow: 1,
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 24,
    marginBottom: 72,
  },
});

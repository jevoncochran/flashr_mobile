import { useEffect, useState } from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/buttons/BackButton";
import { api } from "../utils/api";
import { useAccessToken } from "../utils/useAccessToken";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { View, StyleSheet } from "react-native";
import Score from "../components/Score";
import Flashcard from "../components/Flashcard";
import CardsSwipe from "react-native-cards-swipe";
import { shuffle } from "../utils/shuffle";
import { Card } from "../types";

const PracticeScreen = () => {
  const accessToken = useAccessToken();

  const selectedDeck = useAppSelector(
    (state: RootState) => state.deck.selectedDeck
  );

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [cards, setCards] = useState<Card[]>(selectedDeck?.cards || []);

  const handleCorrect = () => {
    setCorrectCount(correctCount + 1);
  };

  const handleIncorrect = () => {
    setIncorrectCount(incorrectCount + 1);
  };

  useEffect(() => {
    // api
    //   .post(`/views`, { deckId: selectedDeck?.id }, accessToken)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err: any) => {
    //     console.log(err.response.data.message);
    //   });

    // Shuffle the cards directly when setting the state
    if (selectedDeck?.cards) {
      setCards((prev) => shuffle([...prev]));
    }
  }, [selectedDeck?.cards]);

  return (
    <ScreenTemplate>
      <>
        <BackButton />

        <View style={styles.scoreContainer}>
          <Score type="incorrect" count={incorrectCount} />
          <Score type="correct" count={correctCount} />
        </View>

        <View style={styles.cardContainer}>
          <CardsSwipe
            cards={cards}
            cardContainerStyle={{ width: "100%" }}
            renderCard={(card) => <Flashcard card={card} />}
            onSwipedRight={handleCorrect}
            onSwipedLeft={handleIncorrect}
            renderNoMoreCard={() => null}
            loop={false}
          />
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
    flexGrow: 1,
    paddingHorizontal: 8,
    marginTop: 24,
    marginBottom: 72,
  },
});

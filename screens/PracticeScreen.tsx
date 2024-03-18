import { useCallback, useEffect, useState } from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/buttons/BackButton";
import { api } from "../utils/api";
import { useAccessToken } from "../utils/useAccessToken";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { View, StyleSheet } from "react-native";
import Score from "../components/Score";
import Flashcard from "../components/Flashcard";
import CardsSwipe from "react-native-cards-swipe";
import { shuffle } from "../utils/shuffle";
import { Card } from "../types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  incrementKnow,
  incrementStillLearning,
} from "../redux/features/result/resultSlice";

const PracticeScreen = () => {
  const accessToken = useAccessToken();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const selectedDeck = useAppSelector(
    (state: RootState) => state.deck.selectedDeck
  );
  const result = useAppSelector((state: RootState) => state.result);

  const [cards, setCards] = useState<Card[]>(selectedDeck?.cards || []);

  const handleCorrect = () => {
    dispatch(incrementKnow());
  };

  const handleIncorrect = () => {
    dispatch(incrementStillLearning());
  };

  // useEffect(() => {
  //   // api
  //   //   .post(`/views`, { deckId: selectedDeck?.id }, accessToken)
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //   })
  //   //   .catch((err: any) => {
  //   //     console.log(err.response.data.message);
  //   //   });

  //   // Shuffle the cards directly when setting the state
  //   if (selectedDeck?.cards) {
  //     setCards((prev) => shuffle([...prev]));
  //   }
  //   console.log("component is rendering");
  // }, [selectedDeck?.cards]);

  useFocusEffect(
    useCallback(() => {
      if (selectedDeck?.cards) {
        setCards((prev) => shuffle([...prev]));
      }
    }, [selectedDeck?.cards])
  );

  useEffect(() => {
    if (result.know + result.stillLearning === selectedDeck?.cards.length) {
      navigation.navigate("Results");
    }
  }, [result.know, result.stillLearning]);

  return (
    <ScreenTemplate>
      <>
        <BackButton />

        <View style={styles.scoreContainer}>
          <Score type="incorrect" count={result.stillLearning} />
          <Score type="correct" count={result.know} />
        </View>

        <View style={styles.cardContainer}>
          {/* TODO: Consider using onSwipeStart and onSwipeEnd to prevent cards from flipiping during swiping */}
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

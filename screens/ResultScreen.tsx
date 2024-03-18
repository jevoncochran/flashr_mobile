import { Text } from "react-native-paper";
import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/buttons/BackButton";
import { useAppTheme } from "../theme/theme";
import { Octicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Count from "../components/Count";
import FilledButton from "../components/buttons/FilledButton";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { resetResults } from "../redux/features/result/resultSlice";
import { setSelectedDeck } from "../redux/features/deck/deckSlice";
import { Deck } from "../types";

const ResultScreen = () => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const result = useAppSelector((state: RootState) => state.result);
  const selectedDeck = useAppSelector(
    (state: RootState) => state.deck.selectedDeck
  );

  const handlePractice = () => {
    dispatch(setSelectedDeck(selectedDeck));
    dispatch(resetResults());
    navigation.navigate("Practice");
  };

  const getMessage = (knowCards: number, deck: Deck) => {
    if (knowCards < deck.cards.length) {
      return "You're doing great! Keep practicing and you will get better!";
    } else {
      return "Wow, you really know your stuff! Keep up the good work!";
    }
  };

  const getNumberGrade = (knowCards: number, deck: Deck) => {
    const percentage = (knowCards / deck.cards.length) * 100;
    return Math.round(percentage);
  };

  return (
    <ScreenTemplate>
      <>
        <BackButton />
        <View style={styles.topContainer}>
          <Text
            variant="titleLarge"
            style={[styles.caption, { color: theme.colors.primary }]}
          >
            {getMessage(result.know, selectedDeck as Deck)}
          </Text>
          <Octicons
            name="checklist"
            size={52}
            color={theme.colors.primary}
            style={{
              flexGrow: 1,
              textAlign: "center",
            }}
          />
        </View>

        <View style={styles.resultsContainer}>
          <View
            style={[
              styles.scoreContainer,
              {
                borderColor:
                  getNumberGrade(result.know, selectedDeck) >= 60
                    ? theme.colors.secondary
                    : theme.colors.danger,
              },
            ]}
          >
            {result.know === selectedDeck?.cards.length ? (
              <AntDesign
                name="check"
                size={36}
                color={theme.colors.secondary}
              />
            ) : (
              <Text
                variant="bodyLarge"
                style={{
                  color:
                    getNumberGrade(result.know, selectedDeck) >= 60
                      ? theme.colors.secondary
                      : theme.colors.danger,
                }}
              >{`${getNumberGrade(result.know, selectedDeck as Deck)}%`}</Text>
            )}
          </View>

          <View style={styles.countContainer}>
            <Count type="correct" count={result.know} />
            <Count type="incorrect" count={result.stillLearning} />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <FilledButton label="Keep practicing" onPress={handlePractice} />
        </View>
      </>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
  },
  caption: { width: "70%" },
  resultsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    paddingVertical: 8,
  },
  scoreContainer: {
    borderWidth: 12,
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  countContainer: {
    flexGrow: 1,
    gap: 16,
  },

  bottomContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

export default ResultScreen;

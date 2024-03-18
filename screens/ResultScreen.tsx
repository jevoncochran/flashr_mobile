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

  return (
    <ScreenTemplate>
      <>
        <BackButton />
        <View style={styles.topContainer}>
          <Text
            variant="titleLarge"
            style={[styles.caption, { color: theme.colors.primary }]}
          >
            Wow, you really know your stuff! Keep up the good work!
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
              { borderColor: theme.colors.secondary },
            ]}
          >
            <AntDesign
              name="check"
              size={36}
              color={theme.colors.secondary}
              style={[{ borderColor: theme.colors.secondary }]}
            />
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

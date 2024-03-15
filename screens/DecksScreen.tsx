import { useState, useEffect } from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import { Text } from "react-native-paper";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAppTheme } from "../theme/theme";
import ScreenLabel from "../components/ScreenLabel";
import DeckCard from "../components/DeckCard";
import dayjs from "dayjs";
import { api } from "../utils/api";
import { useAppDispatch } from "../redux/hook";
import { Deck } from "../types";
import { setSelectedDeck } from "../redux/features/deck/deckSlice";
import { useNavigation } from "@react-navigation/native";
import { useAcessToken } from "../utils/useAcessToken";

type Props = {};

// TODO: Fix the following error:
// Virtualized lists should never be nested inside plain Scrollviews with the same orientation
const DecksScreen = (props: Props) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const accessToken = useAcessToken();

  const [recentlyViewedDecks, setRecentlyViewedDecks] = useState([]);
  const [userDecks, setUserDecks] = useState([]);

  const theme = useAppTheme();

  const windowHeight = Dimensions.get("window").height;
  const fiftyPercentHeight = windowHeight * 0.3;

  const handlePress = (deck: Deck) => {
    dispatch(setSelectedDeck(deck));
    navigation.navigate("Deck", { deckId: deck.id });
  };

  useEffect(() => {
    api
      .get("/decks/user-specific", accessToken)
      .then((res) => {
        console.log(res.data);
        setUserDecks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScreenTemplate>
      <>
        <ScreenLabel label="Your decks" />
        {recentlyViewedDecks.length > 0 || userDecks.length > 0 ? (
          <>
            <View style={{ marginBottom: 24 }}>
              <Text
                variant="titleLarge"
                style={{
                  color: theme.colors.tertiary,
                  ...styles.subLabel,
                }}
              >
                Recently reviewed
              </Text>
              <View style={{ minHeight: fiftyPercentHeight }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 16,
                    marginBottom: 18,
                  }}
                >
                  <DeckCard date={dayjs()} label="Science concepts" halfWidth />
                  <DeckCard date={dayjs()} label="Math equations" halfWidth />
                </View>
                <DeckCard date={dayjs()} label="French I" />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                variant="titleLarge"
                style={{ color: theme.colors.tertiary, ...styles.subLabel }}
              >
                All decks
              </Text>
              <View style={{ flex: 1 }}>
                {userDecks.length > 0 ? (
                  <FlatList<Deck>
                    data={userDecks}
                    renderItem={({ item: deck }) => (
                      <TouchableOpacity
                        key={deck.id}
                        onPress={() => handlePress(deck)}
                      >
                        <DeckCard
                          date={dayjs(deck.createdAt)}
                          label={deck.title}
                        />
                      </TouchableOpacity>
                    )}
                    contentContainerStyle={{ gap: 16 }}
                  />
                ) : (
                  <Text
                    variant="bodyLarge"
                    style={{ color: theme.colors.primary }}
                  >
                    You haven't created or saved any decks
                  </Text>
                )}
              </View>
            </View>
          </>
        ) : (
          <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
            There are no decks to show
          </Text>
        )}
      </>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  labelContainer: {
    marginBottom: 32,
  },
  subLabel: { marginBottom: 24 },
});

export default DecksScreen;

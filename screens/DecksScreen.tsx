import { useState, useEffect } from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import { Card, Text } from "react-native-paper";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { useAppTheme } from "../theme/theme";
import ScreenLabel from "../components/ScreenLabel";
import DeckCard from "../components/DeckCard";
import dayjs from "dayjs";
import { api } from "../utils/api";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";

type Props = {};

// TODO: Fix the following error:
// Virtualized lists should never be nested inside plain Scrollview
const DecksScreen = (props: Props) => {
  const theme = useAppTheme();

  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  const [recentlyViewedDecks, setRecentlyViewedDecks] = useState([]);
  const [userDecks, setUserDecks] = useState([]);

  const windowHeight = Dimensions.get("window").height;

  const fiftyPercentHeight = windowHeight * 0.3;

  useEffect(() => {
    api
      .get("/decks/user-specific", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
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
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ScreenLabel label="Your decks" />
          <>
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
                        gap: 18,
                        marginBottom: 18,
                      }}
                    >
                      <DeckCard
                        date={dayjs()}
                        label="Science concepts"
                        halfWidth
                      />
                      <DeckCard
                        date={dayjs()}
                        label="Math equations"
                        halfWidth
                      />
                    </View>
                    <DeckCard date={dayjs()} label="French I" />
                  </View>
                </View>

                <View>
                  <Text
                    variant="titleLarge"
                    style={{ color: theme.colors.tertiary, ...styles.subLabel }}
                  >
                    All decks
                  </Text>
                  <View style={styles.allDecksContainer}>
                    {userDecks.length > 0 ? (
                      <FlatList
                        data={userDecks}
                        renderItem={({ item }) => (
                          <DeckCard
                            date={dayjs(item.createdAt)}
                            label={item.title}
                          />
                        )}
                        ItemSeparatorComponent={() => (
                          <View style={{ height: 18 }} />
                        )}
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
        </ScrollView>
      </SafeAreaView>
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

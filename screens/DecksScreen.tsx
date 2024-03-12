import React from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import { Card, Text } from "react-native-paper";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { useAppTheme } from "../theme/theme";
import ScreenLabel from "../components/ScreenLabel";
import DeckCard from "../components/DeckCard";
import dayjs from "dayjs";

type Props = {};

const DecksScreen = (props: Props) => {
  const theme = useAppTheme();

  return (
    <ScreenTemplate>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ScreenLabel label="Your decks" />
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 18,
                marginBottom: 18,
              }}
            >
              <DeckCard date={dayjs()} label="Science concepts" halfWidth />
              <DeckCard date={dayjs()} label="Math equations" halfWidth />
            </View>
            <DeckCard date={dayjs()} label="French I" />
          </View>
          <View>
            <Text
              variant="titleLarge"
              style={{ color: theme.colors.tertiary, ...styles.subLabel }}
            >
              All decks
            </Text>
            {/* <ScrollView> */}
            <View style={styles.allDecksContainer}>
              <DeckCard date={dayjs()} label="French II" />
              <DeckCard date={dayjs()} label="History" />
              <DeckCard date={dayjs()} label="French II" />
              <DeckCard date={dayjs()} label="History" />
            </View>
            {/* </ScrollView> */}
          </View>
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
  allDecksContainer: {
    display: "flex",
    gap: 18,
  },
});

export default DecksScreen;

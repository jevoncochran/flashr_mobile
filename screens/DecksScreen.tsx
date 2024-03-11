import React from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import { Card, Text } from "react-native-paper";
import { SafeAreaView, View, StyleSheet } from "react-native";
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
        <View style={styles.labelContainer}>
          <ScreenLabel label="Your decks" />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text
            variant="titleLarge"
            style={{
              color: theme.colors.tertiary,
              ...styles.subLabelContainer,
            }}
          >
            Recently Reviewed
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
  subLabelContainer: { marginBottom: 24 },
});

export default DecksScreen;

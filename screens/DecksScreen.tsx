import React from "react";
import ScreenTemplate from "../components/ScreenTemplate";
import { Card, Text } from "react-native-paper";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useAppTheme } from "../theme/theme";
import ScreenLabel from "../components/ScreenLabel";

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
            <Card
              style={{
                backgroundColor: theme.colors.secondary,
                height: 140,
                flex: 1,
              }}
            >
              <Card.Content>
                <Text
                  variant="titleSmall"
                  style={{
                    color: theme.colors.backgroundBlue,
                    marginBottom: 18,
                  }}
                >
                  10 Mar 2024
                </Text>
                <Text
                  variant="titleMedium"
                  style={{ color: theme.colors.backgroundBlue }}
                >
                  Science terms
                </Text>
              </Card.Content>
            </Card>
            <Card
              style={{
                backgroundColor: theme.colors.secondary,
                height: 140,
                flex: 1,
              }}
            >
              <Card.Content>
                <Text
                  variant="titleSmall"
                  style={{
                    color: theme.colors.backgroundBlue,
                    marginBottom: 18,
                  }}
                >
                  9 Mar 2024
                </Text>
                <Text
                  variant="titleMedium"
                  style={{ color: theme.colors.backgroundBlue }}
                >
                  Math equations
                </Text>
              </Card.Content>
            </Card>
          </View>
          <Card
            style={{
              backgroundColor: theme.colors.secondary,
              height: 140,
            }}
          >
            <Card.Content>
              <Text
                variant="titleSmall"
                style={{
                  color: theme.colors.backgroundBlue,
                  marginBottom: 18,
                }}
              >
                8 Mar 2024
              </Text>
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.backgroundBlue }}
              >
                French I
              </Text>
            </Card.Content>
          </Card>
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

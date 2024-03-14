import ScreenTemplate from "../components/ScreenTemplate";
import ScreenLabel from "../components/ScreenLabel";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../theme/theme";
import ProfilePic from "../components/ProfilePic";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Text } from "react-native-paper";
import { Profile } from "../types";
import FilledButton from "../components/buttons/FilledButton";
import OutlinedButton from "../components/buttons/OutlinedButton";

const DeckScreen = () => {
  const navigation = useNavigation();

  const theme = useAppTheme();

  const selectedDeck = useAppSelector(
    (state: RootState) => state.deck.selectedDeck
  );
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  const [deckCreatorProfile, setDeckCreatorProfile] = useState<Profile | null>(
    null
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    api
      .get(`/profiles/${selectedDeck?.creatorId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setDeckCreatorProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScreenTemplate>
      <View>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={32} color={theme.colors.primary} />
        </TouchableOpacity>
        <ScreenLabel
          label={selectedDeck?.title as string}
          variant="headlineMedium"
          marginBottom={16}
        />
        <View style={styles.deckDetailsContainer}>
          <View
            style={[
              styles.creatorProfile,
              {
                borderRightWidth: 0.5,
                borderColor: theme.colors.tertiaryLight,
              },
            ]}
          >
            <ProfilePic size={50} />
            <Text
              variant="titleMedium"
              style={[styles.username, { color: theme.colors.primary }]}
            >
              {deckCreatorProfile?.username}
            </Text>
          </View>
          <Text
            variant="titleMedium"
            style={[{ color: theme.colors.primary }, styles.cardCount]}
          >
            2 cards
          </Text>
        </View>

        <View style={styles.memorizationContainer}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            You've memorized
          </Text>
          <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
            48%
          </Text>
        </View>
        <View style={styles.memorizationContainer}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            You've practiced this deck
          </Text>
          <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
            3 times
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <FilledButton label="Practice" onPress={() => {}} />
        <OutlinedButton label="Edit" onPress={() => {}} />
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 24,
  },
  deckDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 72,
  },
  creatorProfile: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
  },
  username: { marginLeft: 8 },
  cardCount: { paddingLeft: 16 },
  memorizationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    gap: 16,
  },
});

export default DeckScreen;

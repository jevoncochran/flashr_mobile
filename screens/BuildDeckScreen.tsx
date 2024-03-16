import {
  View,
  StyleSheet,
  Button,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/buttons/BackButton";
import ConfirmButton from "../components/buttons/ConfirmButton";
import ScreenLabel from "../components/ScreenLabel";
import StyledInput from "../components/StyledInput";
import { useEffect, useState } from "react";
import InputCard from "../components/InputCard";
import { api } from "../utils/api";
import { useAccessToken } from "../utils/useAccessToken";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { Card, Deck } from "../types";

const BuildDeckScreen = () => {
  const accessToken = useAccessToken();
  const navigation = useNavigation();

  const initializedDeck = [{ id: 1, front: "", back: "" }];

  const deckBuildType = useAppSelector(
    (state: RootState) => state.deck.deckBuildType
  );
  const selectedDeck = useAppSelector(
    (state: RootState) => state.deck.selectedDeck
  );

  const [title, setTitle] = useState(
    deckBuildType === "create" ? "" : selectedDeck?.title
  );
  const [deck, setDeck] = useState(
    deckBuildType === "create" ? initializedDeck : selectedDeck?.cards
  );
  const [cardIdCounter, setCardIdCounter] = useState(
    deckBuildType === "create" ? 2 : selectedDeck?.cards?.length + 1
  ); // Initialize card id counter

  const addCard = () => {
    // Add a new card to the deck
    setDeck([...deck, { id: cardIdCounter, front: "", back: "" }]);
    setCardIdCounter(cardIdCounter + 1); // Increment card id counter
  };

  const updateCard = (
    id: number,
    updatedCard: { front: string; back: string }
  ) => {
    // Update the front and back of the specific card in the deck
    setDeck(
      deck?.map((card) => (card.id === id ? { ...card, ...updatedCard } : card))
    );
  };

  const handleConfirm = () => {
    deckBuildType === "create"
      ? api
          .post("/decks", { title, cards: stringifyIds(deck) }, accessToken)
          .then((res) => {
            console.log(res.data);
            navigation.navigate("Home");
          })
          .catch((err: any) => {
            console.error(err);
          })
      : api
          .patch(
            `/decks/${selectedDeck?.id}`,
            { title, cards: stringifyIds(deck) },
            accessToken
          )
          .then((res) => {
            console.log(res.data);
            navigation.navigate("Home");
          })
          .catch((err) => {
            console.error(err);
          });
  };

  const stringifyIds = (deck: Card[]) => {
    return deck.map((card) => {
      return { ...card, id: String(card.id) };
    });
  };

  useEffect(() => {
    console.log("deck: ", deck);
  }, [deck]);

  return (
    <ScreenTemplate>
      {/* TODO: Figure out how to get this right
        behavior="position" with keyboardVerticalOffset of 24 seems to be what I want
        However, this moves the cards up no matter what. So the first card input view is obstructed when clicking into input.
      */}
      <KeyboardAvoidingView
        behavior="padding"
        // keyboardVerticalOffset={24}
        style={{ flex: 1 }}
      >
        <View style={styles.actionContainer}>
          <BackButton marginBottom={0} />
          <ConfirmButton onConfirm={handleConfirm} />
        </View>

        <ScreenLabel
          label="Create deck"
          variant="headlineMedium"
          textAlign="center"
        />

        {/* <ScrollView style={{ flexGrow: 1 }}> */}
        <StyledInput
          label="Title"
          placeholder="E.g. Spanish Greetings"
          value={title}
          autoCapitalize="words"
          onChangeText={(text) => setTitle(text)}
        />

        <FlatList
          data={deck}
          renderItem={({ item }) => (
            <InputCard
              key={item.id}
              id={item.id}
              front={item.front}
              back={item.back}
              updateCard={updateCard}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            gap: 16,
            marginBottom: 16,
          }}
        />
        <Button onPress={addCard} title="Add card" />
      </KeyboardAvoidingView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 16,
  },
});

export default BuildDeckScreen;

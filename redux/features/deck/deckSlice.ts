import { createSlice } from "@reduxjs/toolkit";
import { Deck } from "../../../types";

interface DeckState {
  selectedDeck: Deck | null;
  deckBuildType: "create" | "update" | null;
}

const initialState: DeckState = {
  selectedDeck: null,
  deckBuildType: null,
};

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    setSelectedDeck: (state, action) => {
      state.selectedDeck = action.payload;
    },
    setDeckBuildType: (state, action) => {
      state.deckBuildType = action.payload;
    },
  },
});

export const { setSelectedDeck, setDeckBuildType } = deckSlice.actions;

export default deckSlice.reducer;

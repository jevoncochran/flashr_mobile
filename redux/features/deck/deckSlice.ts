import { createSlice } from "@reduxjs/toolkit";
import { Deck } from "../../../types";

interface DeckState {
  selectedDeck: Deck | null;
}

const initialState: DeckState = {
  selectedDeck: null,
};

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    setSelectedDeck: (state, action) => {
      state.selectedDeck = action.payload;
    },
  },
});

export const { setSelectedDeck } = deckSlice.actions;

export default deckSlice.reducer;

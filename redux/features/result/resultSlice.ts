import { createSlice } from "@reduxjs/toolkit";

interface ResultState {
  know: number;
  stillLearning: number;
}

const initialState: ResultState = {
  know: 0,
  stillLearning: 0,
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    incrementKnow: (state) => {
      state.know += 1;
    },
    incrementStillLearning: (state) => {
      state.stillLearning += 1;
    },
    resetResults: (state) => {
      return initialState;
    },
  },
});

export const { incrementKnow, incrementStillLearning, resetResults } =
  resultSlice.actions;

export default resultSlice.reducer;

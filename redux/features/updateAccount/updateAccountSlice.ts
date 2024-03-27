import { createSlice } from "@reduxjs/toolkit";

type AccountInputOption = "username" | "email" | "password";

interface UpdateAccountState {
  selectedInput: AccountInputOption | null;
}

const initialState: UpdateAccountState = {
  selectedInput: null,
};

export const updateAccountSlice = createSlice({
  name: "updateAccount",
  initialState,
  reducers: {
    setSelectedInput: (state, action) => {
      state.selectedInput = action.payload;
    },
  },
});

export const { setSelectedInput } = updateAccountSlice.actions;

export default updateAccountSlice.reducer;

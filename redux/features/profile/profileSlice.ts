import { createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  id: string | null;
  username: string | null;
  image: string | null;
}

const initialState: ProfileState = {
  id: null,
  username: null,
  image: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      (state.id = action.payload.id),
        (state.username = action.payload.username),
        (state.image = action.payload.image);
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;

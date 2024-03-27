import { StyleSheet, View } from "react-native";
import ScreenLabel from "../components/ScreenLabel";
import ScreenTemplate from "../components/ScreenTemplate";
import BackButton from "../components/buttons/BackButton";
import OutlinedButton from "../components/buttons/OutlinedButton";
import ScreenButton from "../components/profile/ScreenButton";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state: RootState) => state.profile);
  const email = useAppSelector((state: RootState) => state.auth.user?.email);
  return (
    <ScreenTemplate>
      <BackButton />

      <ScreenLabel label="Settings" />

      <ScreenButton
        label="Username"
        subtext={profile.username as string}
        onPress={() => navigation.navigate("UpdateAccount")}
      />
      <ScreenButton label="Email" subtext={email} onPress={() => {}} />
      <ScreenButton label="Change password" onPress={() => {}} />
      <View style={styles.bottom}>
        <OutlinedButton label="Log out" onPress={() => dispatch(logout())} />
        <OutlinedButton label="Delete account" onPress={() => {}} />
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexGrow: 1,
    gap: 16,
    justifyContent: "flex-end",
  },
});

export default SettingsScreen;

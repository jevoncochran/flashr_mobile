import { View, StyleSheet } from "react-native";
import ScreenTemplate from "../components/ScreenTemplate";
import ScreenLabel from "../components/ScreenLabel";
import { Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";
import ProfilePic from "../components/ProfilePic";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ProfileButton from "../components/profile/ProfileButton";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/features/auth/authSlice";
import OutlinedButton from "../components/buttons/OutlinedButton";

const ProfileScreen = () => {
  const theme = useAppTheme();

  const dispatch = useAppDispatch();

  return (
    <ScreenTemplate>
      <>
        <ScreenLabel label="Your profile" />
        <View style={styles.container}>
          <View style={styles.profileTop}>
            <View style={styles.profilePicContainer}>
              <ProfilePic />
            </View>
            <Text
              variant="headlineSmall"
              style={{ color: theme.colors.primary, marginBottom: 24 }}
            >
              jevon_cochran9
            </Text>

            <ProfileButton
              label="Your courses"
              icon={
                <MaterialCommunityIcons
                  name="bookshelf"
                  size={32}
                  color={theme.colors.secondary}
                />
              }
            />
            <ProfileButton
              label="Your settings"
              icon={
                <MaterialIcons
                  name="manage-accounts"
                  size={32}
                  color={theme.colors.secondary}
                />
              }
            />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <OutlinedButton label="Log out" onPress={() => dispatch(logout())} />
        </View>
      </>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  profileTop: { alignItems: "center" },
  profilePicContainer: { marginBottom: 16 },
  topButton: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    padding: 0,
  },
  topButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topButtonLeftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  topButtonRightContainer: {
    justifyContent: "center",
  },
  bottomButtonContainer: { paddingBottom: 24 },
});

export default ProfileScreen;

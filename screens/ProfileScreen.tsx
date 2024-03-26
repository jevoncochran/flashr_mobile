import { View, StyleSheet, TouchableOpacity } from "react-native";
import ScreenTemplate from "../components/ScreenTemplate";
import ScreenLabel from "../components/ScreenLabel";
import { Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";
import ProfilePic from "../components/ProfilePic";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ProfileButton from "../components/profile/ProfileButton";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout } from "../redux/features/auth/authSlice";
import OutlinedButton from "../components/buttons/OutlinedButton";
import { RootState } from "../redux/store";
import * as ImagePicker from "expo-image-picker";
import { api } from "../utils/api";
import { setProfilePic } from "../redux/features/profile/profileSlice";

const ProfileScreen = () => {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state: RootState) => state.profile);
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  const handleProfilePicPress = async () => {
    // Ask for permission to access camera and gallery
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadPic(result.assets[0].uri);
    }
  };

  const uploadPic = async (imageUri: string) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "profile.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await api.post(
        `/profiles/${profile.id}/image-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      dispatch(setProfilePic(response.data.imageUrl));
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  return (
    <ScreenTemplate>
      <>
        <ScreenLabel label="Your profile" />
        <View style={styles.container}>
          <View style={styles.profileTop}>
            <TouchableOpacity onPress={handleProfilePicPress}>
              <View style={styles.profilePicContainer}>
                <ProfilePic />
              </View>
            </TouchableOpacity>
            <Text
              variant="headlineSmall"
              style={{ color: theme.colors.primary, marginBottom: 24 }}
            >
              {profile.username}
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

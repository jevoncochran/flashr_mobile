import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../theme/theme";

interface Props {
  size?: number;
}

const ProfilePic = ({ size = 100 }: Props) => {
  const theme = useAppTheme();
  const profilePic = useAppSelector((state: RootState) => state.profile.image);

  return profilePic ? (
    <Image
      source={{ uri: profilePic }}
      alt=""
      style={[styles.image, { width: size, height: size }]}
    />
  ) : (
    <MaterialCommunityIcons
      name="account-circle-outline"
      size={size}
      color={theme.colors.tertiary}
    />
  );
};

const styles = StyleSheet.create({
  image: { borderRadius: 50 },
});

export default ProfilePic;

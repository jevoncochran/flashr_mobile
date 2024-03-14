import { Image, StyleSheet } from "react-native";

interface Props {
  size?: number;
}

const ProfilePic = ({ size = 100 }: Props) => {
  return (
    <Image
      source={require("../assets/profile_pic_example.jpeg")}
      alt=""
      style={[styles.image, { width: size, height: size }]}
    />
  );
};

const styles = StyleSheet.create({
  image: { borderRadius: 50 },
});

export default ProfilePic;

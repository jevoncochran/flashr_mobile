import { Image, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <Image
      source={require("../../assets/profile_pic_example.jpeg")}
      alt=""
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
});

export default ProfileScreen;

import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

type Props = {};

const handleConfirm = () => {
  return;
};

const ConfirmButton = (props: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={handleConfirm}>
      <Entypo name="check" size={32} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

export default ConfirmButton;

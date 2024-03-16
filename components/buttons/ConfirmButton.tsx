import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

interface Props {
  onConfirm: () => void;
}

const ConfirmButton = ({ onConfirm }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onConfirm}>
      <Entypo name="check" size={32} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

export default ConfirmButton;

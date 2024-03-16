import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../../theme/theme";

interface Props {
  marginBottom?: number;
}

const BackButton = ({ marginBottom = 24 }: Props) => {
  const navigation = useNavigation();

  const theme = useAppTheme();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      onPress={handleGoBack}
      style={{ marginBottom: marginBottom }}
    >
      {/* TODO: Let user choose between X and arrow icon */}
      <Ionicons name="arrow-back" size={32} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

export default BackButton;

import { useState } from "react";
import { View, KeyboardTypeOptions } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { useAppTheme } from "../theme/theme";

interface Props {
  keyboardType?: KeyboardTypeOptions;
  label: string;
  placeholder: string;
  secureText?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  isCardInput?: boolean;
  marginBottom?: number;
}

function StyledInput({
  keyboardType,
  label,
  placeholder,
  secureText,
  value,
  onChangeText,
  autoCapitalize = "none",
  isCardInput,
  marginBottom = 24,
}: Props) {
  const theme = useAppTheme();

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={{ marginBottom }}>
      <TextInput
        value={value}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={
          isCardInput ? theme.colors.backgroundBlue : "#c2c2c2"
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        underlineColor="transparent"
        underlineColorAndroid="transparent"
        activeUnderlineColor="transparent"
        contentStyle={{ paddingLeft: 0 }}
        textColor={isCardInput ? theme.colors.backgroundBlue : "white"}
        secureTextEntry={secureText}
        autoCapitalize={autoCapitalize}
        style={{
          backgroundColor: "transparent",
          color: isCardInput ? theme.colors.backgroundBlue : "white",
          borderColor: isCardInput ? theme.colors.backgroundBlue : "white",
          borderBottomWidth: isFocused ? 3 : 1,
        }}
      />
      <HelperText
        type="info"
        padding="none"
        style={{ color: isCardInput ? theme.colors.backgroundBlue : "#c2c2c2" }}
      >
        {label}
      </HelperText>
    </View>
  );
}

export default StyledInput;

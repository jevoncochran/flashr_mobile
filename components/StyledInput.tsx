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
  error?: boolean;
  errorMessage?: string;
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
  error,
  errorMessage,
}: Props) {
  const theme = useAppTheme();

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getInputStyles = (
    error: boolean | undefined,
    isCardInput: boolean | undefined
  ) => {
    if (error) {
      return {
        helperTextColor: theme.colors.danger,
        borderColor: theme.colors.danger,
      };
    }

    if (isCardInput) {
      return {
        helperTextColor: theme.colors.backgroundBlue,
        borderColor: theme.colors.backgroundBlue,
      };
    }

    return {
      helperTextColor: theme.colors.tertiary,
      borderColor: theme.colors.primary,
    };
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
        selectionColor={isCardInput ? theme.colors.backgroundBlue : "white"}
        error={error}
        style={{
          backgroundColor: "transparent",
          color: isCardInput ? theme.colors.backgroundBlue : "white",
          borderColor: getInputStyles(error, isCardInput).borderColor,
          borderBottomWidth: isFocused ? 3 : 1,
        }}
      />
      <HelperText
        type="info"
        padding="none"
        style={{ color: getInputStyles(error, isCardInput).helperTextColor }}
      >
        {errorMessage ? errorMessage : label}
      </HelperText>
    </View>
  );
}

export default StyledInput;

import { useState } from "react";
import { View, StyleSheet, KeyboardTypeOptions } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

interface Props {
  type?: KeyboardTypeOptions;
  label: string;
  placeholder: string;
  secureText?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

function StyledInput({
  type,
  label,
  placeholder,
  secureText,
  value,
  onChangeText,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        keyboardType={type}
        placeholder={placeholder}
        placeholderTextColor="#c2c2c2"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        underlineColor="transparent"
        underlineColorAndroid="transparent"
        activeUnderlineColor="transparent"
        contentStyle={{ paddingLeft: 0 }}
        textColor="white"
        secureTextEntry={secureText}
        autoCapitalize="none"
        style={{
          borderBottomWidth: isFocused ? 3 : 1,
          ...styles.input,
        }}
      />
      <HelperText type="info" padding="none" style={styles.label}>
        {label}
      </HelperText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  input: {
    backgroundColor: "transparent",
    color: "white",
    borderColor: "white",
  },
  label: {
    color: "#c2c2c2",
  },
});

export default StyledInput;

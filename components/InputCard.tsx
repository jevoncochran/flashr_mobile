import { useState } from "react";
import { Card } from "react-native-paper";
import { useAppTheme } from "../theme/theme";
import StyledInput from "./StyledInput";

interface Props {
  id: number;
  front: string;
  back: string;
  updateCard: (
    id: number,
    updatedCard: { front: string; back: string }
  ) => void; // Function to update card
}

const InputCard = ({ id, front, back, updateCard }: Props) => {
  const theme = useAppTheme();

  const [card, setCard] = useState({ id, front, back });

  // Function to handle front input change
  const handleFrontChange = (text: string) => {
    setCard({ ...card, front: text }); // Update local state
    updateCard(id, { front: text, back: card.back }); // Update card in deck
  };

  // Function to handle back input change
  const handleBackChange = (text: string) => {
    setCard({ ...card, back: text }); // Update local state
    updateCard(id, { front: card.front, back: text }); // Update card in deck
  };

  return (
    <Card style={{ backgroundColor: theme.colors.secondary }}>
      <Card.Content>
        <StyledInput
          label="Front"
          placeholder=""
          value={card.front}
          onChangeText={handleFrontChange}
          autoCapitalize="sentences"
          isCardInput
          marginBottom={0}
        />

        <StyledInput
          label="Back"
          placeholder=""
          value={card.back}
          onChangeText={handleBackChange}
          autoCapitalize="sentences"
          isCardInput
          marginBottom={0}
        />
      </Card.Content>
    </Card>
  );
};

export default InputCard;

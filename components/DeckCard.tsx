import React from "react";
import { Dayjs } from "dayjs";
import { Card, Text } from "react-native-paper";
import { useAppTheme } from "../theme/theme";
import dayjs from "dayjs";

type Props = {
  date: Dayjs;
  label: string;
  halfWidth?: boolean;
};

const DeckCard = ({ date, label, halfWidth = false }: Props) => {
  const theme = useAppTheme();

  return (
    <Card
      style={{
        backgroundColor: theme.colors.secondary,
        height: 140,
        flex: halfWidth ? 1 : 0,
      }}
    >
      <Card.Content>
        <Text
          variant="titleSmall"
          style={{
            color: theme.colors.backgroundBlue,
            marginBottom: 18,
          }}
        >
          {dayjs(date).format("DD MMM YYYY")}
        </Text>
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.backgroundBlue }}
        >
          {label}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default DeckCard;

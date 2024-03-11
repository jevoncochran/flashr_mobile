import React from "react";
import { Card, Title, Paragraph, useTheme } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";

interface Props {
  front: string;
  back: string;
}

const FlashCard = ({ front, back }: Props) => {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Title style={styles.cardText}>{front}</Title>
        {/* <Paragraph>{content}</Paragraph> */}
      </Card.Content>
    </Card>
  );
};

const { height, width } = Dimensions.get("window");
const cardHeight = height * 0.7; // Adjust the height based on your requirements
const cardWidth = width * 0.9; // Adjust the width based on your requirements

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  cardText: {
    color: "black",
  },
});

export default FlashCard;

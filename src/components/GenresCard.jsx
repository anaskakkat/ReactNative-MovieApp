import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../constants/colors";
import Fonts from "../constants/Fonts";

const { width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const GenresCard = ({ genreName, active, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: active ? colors.ACTIVE : colors.WHITE,
      }}
      activeOpacity={0.5}
      onPress={() => onPress(genreName)}
    >
      <Text
        style={{
          ...styles.genreText,
          color: active ? colors.WHITE : colors.BLACK,
        }}
      >
        {genreName}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.WHITE,
    paddingVertical: 8,
    elevation: 3,
    marginVertical: 2,
    width: setWidth(25),
  },
  genreText: {
    fontSize: 13,
    color: colors.ACTIVE,
    fontFamily: Fonts.BOLD,
  },
});
export default GenresCard;

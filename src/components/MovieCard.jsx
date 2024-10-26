import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Fonts from "../constants/Fonts";
import colors from "../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Images from "../constants/Images";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getLanguage, getPoster } from "../services/movieService";
const MovieCard = ({ vote, image, tittle, language, count, size = 1 }) => {
  const [liked, setLiked] = useState(false);
  const [heartCount, setHeartCount] = useState(Number(count));
  const handleHeartPress = () => {
    setLiked(!liked);
    setHeartCount((prevCount) => (!liked ? prevCount + 1 : prevCount - 1));
  };
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <ImageBackground
        style={{ ...styles.container, width: 230 * size, height: 340 * size }}
        source={{ uri: getPoster(image) }}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={{ ...styles.imdbContainer, paddingVertical: 3 * size }}>
          <Image
            style={{ ...styles.imdbImage, height: 20 * size, width: 50 * size }}
            source={Images.IMDB}
            resizeMode="cover"
          />
          <Text
            style={{
              ...styles.imdbRating,
              marginRight: 5 * size,
              fontSize: 14 * size,
            }}
          >
            {vote}
          </Text>
        </View>
        <TouchableNativeFeedback onPress={handleHeartPress}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={25}
            color={liked ? colors.HEART : colors.WHITE}
            style={{ position: "absolute", bottom: 10, left: 10,padding: 5  }}
          />
        </TouchableNativeFeedback>
      </ImageBackground>
      <View>
        <Text
          style={{
            ...styles.movieTitle,
            width: 230 * size,
            fontSize: 15 * size,
          }}
          numberOfLines={3}
        >
          {tittle}
        </Text>
        <View style={styles.movieSubTitleContainer}>
          <Text style={{ ...styles.movieSubTitle, fontSize: 12 * size }}>
            {getLanguage(language).english_name}
          </Text>
          <View style={styles.rowAndCenter}>
            <FontAwesome
              name="heart"
              size={15 * size}
              color={colors.HEART}
              style={{ marginRight: 5 }}
            />
            <Text style={{ ...styles.movieSubTitle, fontSize: 12 * size }}>
              {heartCount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
    // backgroundColor: colors.ACTIVE,
  },
  movieTitle: {
    fontFamily: Fonts.EXTRA_BOLD,
    color: colors.GRAY,
    paddingVertical: 2,
    marginTop: 5,
    width: 230,
  },
  movieSubTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  movieSubTitle: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  imdbContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: colors.YELLOW,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3,
  },
  imdbImage: {
    height: 20,
    width: 50,
    borderBottomLeftRadius: 5,
  },
  imdbRating: {
    marginRight: 5,
    color: colors.HEART,
    fontFamily: Fonts.EXTRA_BOLD,
  },
});

export default MovieCard;

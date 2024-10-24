import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import GenresCard from "../components/GenresCard";
import ItemSeparator from "../components/ItemSeparator";
import Fonts from "../constants/Fonts";

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];
const HomeScreen = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar
          style="auto"
          translucent={false}
          backgroundColor={colors.BASIC_BACKGROUND}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Now Playing</Text>
          <Text style={styles.headerSubtitle}>VIEW ALL</Text>
        </View>
        <View style={styles.genreContainer}>
          <FlatList
            data={Genres}
            keyExtractor={(item) => item}
            horizontal
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <GenresCard
                genreName={item}
                active={item === activeGenre ? true : false}
                onPress={setActiveGenre}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.BASIC_BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: colors.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: Platform.OS === "ios" ? 30 : 10, // Adjust padding for iOS
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.REGULAR,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.ACTIVE,
  },
  genreContainer: {
    paddingVertical: 20,
    fontFamily: Fonts.EXTRA_BOLD,
  },
});

export default HomeScreen;

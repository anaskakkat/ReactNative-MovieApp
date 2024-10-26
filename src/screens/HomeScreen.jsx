import React, { useEffect, useState } from "react";
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
import MovieCard from "../components/MovieCard";
import {
  getAllGenres,
  getNowPlayingMovies,
  getTopRatedMovies,
} from "../services/movieService";

const HomeScreen = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genres, setGenres] = useState([{ id: 0, name: "All" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel for better performance
        const [nowPlayingResult, upcomingResult, genresResult] =
          await Promise.all([
            getNowPlayingMovies(),
            getTopRatedMovies(),
            getAllGenres(),
          ]);

        setNowPlayingMovies(nowPlayingResult.results);
        setUpcomingMovies(upcomingResult.results);

        if (genresResult.genres) {
          setGenres((prevGenres) => [
            { id: 0, name: "All" },
            ...genresResult.genres,
          ]);
        } else {
          console.error("Unexpected genres response structure:", genresResult);
          console.error("Failed to load genres properly");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
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
            data={genres}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <GenresCard
                genreName={item.name}
                active={item.name === activeGenre}
                onPress={(name) => setActiveGenre(name)}
              />
            )}
          />
        </View>
        <View>
          <FlatList
            data={nowPlayingMovies}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <MovieCard
                vote={item.vote_average}
                image={item.poster_path}
                tittle={item.original_title}
                language={item.original_language}
                count={item.vote_count}
              />
            )}
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Top Rated</Text>
          <Text style={styles.headerSubtitle}>VIEW ALL</Text>
        </View>
        <View>
          <FlatList
            data={upcomingMovies}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <MovieCard
                vote={item.vote_average}
                image={item.poster_path}
                tittle={item.original_title}
                language={item.original_language}
                count={item.vote_count}
                size={0.7}
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
    flexGrow: 1,
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
  movieListContainer: {
    marginBottom: 20,
  },
});

export default HomeScreen;

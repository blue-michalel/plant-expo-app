import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Input, Block } from "components";
import * as theme from "constants/theme";

const Search = ({
  handleSearch,
  queryString,
  setQueryString,
}: {
  handleSearch: (text: string) => void;
  queryString: string;
  setQueryString: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const searchFocus = new Animated.Value(0.6);

  const isEditing = searchFocus && queryString;

  const handleSearchFocus = (status: boolean) => {
    Animated.timing(searchFocus, {
      toValue: status ? 0.8 : 0.6,
      duration: 150, //ms
      useNativeDriver: false,
    }).start();
  };

  const handleChange = (text: string) => {
    handleSearch(text);
    setQueryString(text);
  };

  return (
    <Block animated middle flex={searchFocus} style={styles.search}>
      <Input
        label=""
        placeholder="Search"
        placeholderTextColor={theme.colors.gray2}
        style={styles.searchInput}
        onFocus={() => handleSearchFocus(true)}
        onBlur={() => handleSearchFocus(false)}
        onChangeText={handleChange}
        value={queryString}
        onRightPress={() => (isEditing ? setQueryString("") : null)}
        rightStyle={styles.searchRight}
        rightLabel={
          <FontAwesome
            name={isEditing ? "close" : "search"}
            size={theme.sizes.base / 1.6}
            color={theme.colors.gray2}
            style={styles.searchIcon}
          />
        }
      />
    </Block>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2,
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: "rgba(142, 142, 147, 0.06)",
    borderColor: "rgba(142, 142, 147, 0.06)",
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: "transparent",
  },
  searchIcon: {
    position: "absolute",
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
});

export default Search;

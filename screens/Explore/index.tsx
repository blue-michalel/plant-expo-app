import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Button, Block, Typography } from "components";
import * as theme from "constants/theme";
import * as mocks from "constants/mocks";

import Search from "./Search";
import RenderExplore from "./Explore";
import { NavigationStackScreenProps } from "react-navigation-stack";

export const Explore = ({ images, navigation }: ExploreProps) => {
  const category = navigation.state.params?.category;

  //TODO try to debounce
  const handleSearch = (text: string) => {
    const searched = images
      .filter(({ tags }) =>
        tags.some((tag) => tag.toLowerCase().includes(text.toLowerCase())),
      )
      .map((image) => image.src);

    setImagesList(searched);
  };

  const [queryString, setQueryString] = useState("");
  const [loading, setLoading] = useState(false);

  const [imagesList, setImagesList] = useState(
    images.map((image) => image.src),
  );

  const restart = () => {
    setLoading(true);
    const imageList = images.map((image) => image.src);

    setTimeout(() => {
      setQueryString("");
      setImagesList(imageList);
      setLoading(false);
    }, 200);
  };

  //TODO change conditional rendering
  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Typography h1 bold>
          Explore {category?.name.toLowerCase() ?? ""}
        </Typography>
        <Search
          handleSearch={handleSearch}
          queryString={queryString}
          setQueryString={setQueryString}
        />
      </Block>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
        <RenderExplore images={imagesList} navigation={navigation} />
      </ScrollView>

      {!imagesList.length ? (
        <LinearGradient
          locations={[0.5, 1]}
          style={styles.footer}
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}
        >
          <Button gradient style={{ width: width / 2.678 }} onPress={restart}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Typography bold white center>
                Clear
              </Typography>
            )}
          </Button>
        </LinearGradient>
      ) : (
        <></>
      )}
    </Block>
  );
};

interface ExploreProps
  extends NavigationStackScreenProps<{
    category: typeof mocks.categories[0];
  }> {
  images: typeof mocks.explore;
}

Explore.defaultProps = {
  images: mocks.explore,
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  explore: {
    marginHorizontal: theme.sizes.padding * 1.25,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.1,
    width: width,
    paddingBottom: theme.sizes.base * 4,
  },
});

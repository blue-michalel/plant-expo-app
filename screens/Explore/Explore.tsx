import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

import { Block, Typography } from "components";
import * as theme from "constants/theme";

const RenderExplore = ({ images, navigation }: RenderExploreProps) => {
  if (!images.length) {
    return <Typography>No images available</Typography>;
  }

  const mainImage = images[0];

  const renderImage = (img: ImageSourcePropType, index: number) => {
    const sizes = Image.resolveAssetSource(img);
    const fullWidth = width - theme.sizes.padding * 2.5;
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;

    return (
      <TouchableOpacity
        key={`img-${index}`}
        onPress={() => navigation.navigate("Products")}
      >
        <Image
          source={img}
          style={[styles.image, { minWidth: imgWidth, maxWidth: imgWidth }]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Block style={{ marginBottom: height / 3 }}>
      <TouchableOpacity
        style={[styles.image, styles.mainImage]}
        onPress={() => navigation.navigate("Products")}
      >
        <Image source={mainImage} style={[styles.image, styles.mainImage]} />
      </TouchableOpacity>
      <Block row space="between" wrap>
        {images
          .slice(1)
          .map((src: ImageSourcePropType, index: number) =>
            renderImage(src, index),
          )}
      </Block>
    </Block>
  );
};

interface RenderExploreProps extends NavigatorProps {
  images: ImageSourcePropType[];
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - theme.sizes.padding * 2.5,
    marginBottom: theme.sizes.base,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: width - theme.sizes.padding * 2.5,
    minHeight: width - theme.sizes.padding * 2.5,
  },
});

export default RenderExplore;

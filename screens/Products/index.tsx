import React from "react";
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Divider, Block, Typography } from "components";

import * as theme from "constants/theme";
import * as mocks from "constants/mocks";

const { width, height } = Dimensions.get("window");

const Gallery = ({ product }: { product: ProductsProps["product"] }) => (
  <FlatList
    horizontal
    pagingEnabled
    scrollEnabled
    showsHorizontalScrollIndicator={false}
    snapToAlignment="center"
    data={product.images}
    keyExtractor={(item, index) => `${index}`}
    renderItem={({ item }) => (
      <Image
        source={item}
        resizeMode="contain"
        style={{ width, height: height / 2.8 }}
      />
    )}
  />
);

export const Products = ({ product }: ProductsProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Gallery product={product} />

      <Block style={styles.product}>
        <Typography h2 bold>
          {product.name}
        </Typography>
        <Block flex={false} row margin={[theme.sizes.base, 0]}>
          {product.tags.map((tag) => (
            <Typography key={`tag-${tag}`} caption gray style={styles.tag}>
              {tag}
            </Typography>
          ))}
        </Block>
        <Typography gray light height={22}>
          {product.description}
        </Typography>

        <Divider margin={[theme.sizes.padding * 0.9, 0]} />

        <Block>
          <Typography semibold>Gallery</Typography>
          <Block row margin={[theme.sizes.padding * 0.9, 0]}>
            {product.images.slice(1, 3).map((image, index) => (
              <Image
                key={`gallery-${index}`}
                source={image}
                style={styles.image}
              />
            ))}
            <Block
              flex={false}
              card
              center
              middle
              color="rgba(197,204,214,0.20)"
              style={styles.more}
            >
              <Typography gray>+{product.images.slice(3).length}</Typography>
            </Block>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

Products.defaultProps = {
  product: mocks.products[0],
};

interface ProductsProps extends NavigatorProps {
  product: typeof mocks.products[0];
}

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: theme.sizes.base,
  },
  more: {
    width: 55,
    height: 55,
  },
});

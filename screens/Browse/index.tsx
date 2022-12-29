import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Badge, Button, Block, Typography } from "components";
import * as theme from "constants/theme";
import * as mocks from "constants/mocks";

const { width } = Dimensions.get("window");

export const Browse = ({ navigation, categories, profile }: BrowseProps) => {
  const tabs = ["Products", "Inspirations", "Shop"];

  const [activeTab, setActiveTab] = useState({
    active: "Products",
    categories,
  });

  const handleTab = (tab: string) => {
    const filtered = categories.filter((category) =>
      category.tags.includes(tab.toLowerCase()),
    );

    setActiveTab({ active: tab, categories: filtered });
  };

  const renderTab = (tab: string) => {
    const isActive = activeTab.active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Typography size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Typography>
      </TouchableOpacity>
    );
  };

  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Typography h1 bold>
          Browse
        </Typography>
        <Button onPress={() => navigation.navigate("Settings")}>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>

      <Block flex={false} row style={styles.tabs}>
        {tabs.map((tab) => renderTab(tab))}
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Block flex={false} row space="between" style={styles.categories}>
          {activeTab.categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              onPress={() => navigation.navigate("Explore", { category })}
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  customColor="rgba(41,216,143,0.20)"
                >
                  <Image source={category.image} />
                </Badge>
                <Typography medium height={20}>
                  {category.name}
                </Typography>
                <Typography gray caption>
                  {category.count} products
                </Typography>
              </Card>
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
};

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
};

interface BrowseProps extends NavigatorProps {
  profile: typeof mocks.profile;
  categories: typeof mocks.categories;
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
});

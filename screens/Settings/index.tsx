import React, { useState } from "react";
import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "@react-native-community/slider";
import { Button, Block, Typography, Divider, Switch } from "components";
import { DeviceStorage } from "utils";
import { AUTHENTICATION_DATA } from "constants/keys";
import * as theme from "constants/theme";
import * as mocks from "constants/mocks";

export const Settings = ({ navigation, profile }: SettingsProps) => {
  const [credential, setCredential] = useState({
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile,
  });
  const [editing, setEditing] = useState({
    username: false,
    location: false,
  });
  const toggleEdit = (key: keyof typeof editing) => {
    const newEditing = { ...editing };
    newEditing[key] = !newEditing[key];

    setEditing(newEditing);
  };

  const handleEdit = (name: keyof typeof profile, value: string) => {
    const profileEdit = credential.profile;
    //@ts-ignore
    profileEdit[name] = value;
    setCredential({ ...credential, profile: profileEdit });
  };

  const renderEdit = (name: keyof SettingsProps["profile"]) => {
    return (
      <TextInput
        defaultValue={profile[name]}
        onChangeText={(text) => handleEdit(name, text)}
      />
    );
  };

  const handleLogout = async () => {
    const success = await DeviceStorage.removeData(AUTHENTICATION_DATA);
    console.log("success?", success);

    navigation.navigate("AuthLoading");
  };

  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Typography h1 bold>
          Settings
        </Typography>
        <Button>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.inputs}>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Typography gray2 style={{ marginBottom: 10 }}>
                Username
              </Typography>
              {renderEdit("username")}
            </Block>
            <Typography medium secondary onPress={() => toggleEdit("username")}>
              {editing.username ? "Save" : "Edit"}
            </Typography>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Typography gray2 style={{ marginBottom: 10 }}>
                Location
              </Typography>
              {renderEdit("location")}
            </Block>
            <Typography medium secondary onPress={() => toggleEdit("location")}>
              {editing.location ? "Save" : "Edit"}
            </Typography>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Typography gray2 style={{ marginBottom: 10 }}>
                E-mail
              </Typography>
              <Typography bold>{profile.email}</Typography>
            </Block>
          </Block>
        </Block>

        <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

        <Block style={styles.sliders}>
          <Block margin={[10, 0]}>
            <Typography gray2 style={{ marginBottom: 10 }}>
              Budget
            </Typography>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              style={{ height: 19 }}
              step={1}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
              value={credential.budget}
              onValueChange={(budget) =>
                setCredential({ ...credential, budget })
              }
            />
            <Typography caption gray right>
              ${credential.budget}
            </Typography>
          </Block>
          <Block margin={[10, 0]}>
            <Typography gray2 style={{ marginBottom: 10 }}>
              Monthly Cap
            </Typography>
            <Slider
              minimumValue={0}
              maximumValue={5000}
              style={{ height: 19 }}
              step={1}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
              value={credential.monthly}
              onValueChange={(monthly) =>
                setCredential({ ...credential, monthly })
              }
            />
            <Typography caption gray right>
              ${credential.monthly}
            </Typography>
          </Block>
        </Block>

        <Divider />

        <Block style={styles.toggles}>
          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}
          >
            <Typography gray2>Notifications</Typography>
            <Switch
              value={credential.notifications}
              onValueChange={(notifications) =>
                setCredential({ ...credential, notifications })
              }
            />
          </Block>

          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}
          >
            <Typography gray2>Newsletter</Typography>
            <Switch
              value={credential.newsletter}
              onValueChange={(newsletter) =>
                setCredential({ ...credential, newsletter })
              }
            />
          </Block>
        </Block>

        <Block style={styles.logout} middle flex={0.5}>
          <Button onPress={handleLogout}>
            <Typography center semibold>
              Logout
            </Typography>
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

Settings.defaultProps = {
  profile: mocks.profile,
};

interface SettingsProps extends NavigatorProps {
  profile: typeof mocks.profile;
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end",
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  logout: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});

import React, { useEffect, useState } from "react";
import { Block, Typography, Button } from "components";
import { TERMS_SERVICE_CONSENT } from "constants/keys";
import { DeviceStorage } from "utils";
import * as theme from "constants/theme";
import TermsService from "./TermsService";
import Illustrations from "./Illustrations";

export const Welcome = ({ navigation }: NavigatorProps) => {
  const [showTerms, setShowTerms] = useState(false);

  const mountComponent = async () => {
    const userConsent =
      (await DeviceStorage.getData(TERMS_SERVICE_CONSENT)) ?? false;
    setShowTerms(!userConsent);
  };

  const handleConsent = async () => {
    await DeviceStorage.saveData(TERMS_SERVICE_CONSENT, "true");
    console.log("handleConsent");

    setShowTerms(false);
  };

  useEffect(() => {
    mountComponent();
  }, []);

  return (
    <Block>
      <Block center bottom flex={0.4}>
        <Typography h1 center bold>
          Your Home.
          <Typography h1 primary>
            Greener.
          </Typography>
        </Typography>
        <Typography h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
          Enjoy the experience.
        </Typography>
      </Block>
      <Block center middle>
        <Illustrations />
      </Block>
      <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
        <Button gradient onPress={() => navigation.navigate("Login")}>
          <Typography center semibold white>
            Login
          </Typography>
        </Button>
        <Button shadow onPress={() => navigation.navigate("SignUp")}>
          <Typography center semibold>
            Signup
          </Typography>
        </Button>
        <Button onPress={() => setShowTerms(true)}>
          <Typography center caption gray>
            Terms of service
          </Typography>
        </Button>
      </Block>
      <TermsService visible={showTerms} onClick={handleConsent} />
    </Block>
  );
};

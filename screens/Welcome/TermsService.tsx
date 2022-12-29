import React from "react";
import { Modal } from "react-native";
import { Block, Typography, Button } from "components";
import * as theme from "constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import serviceTerms from "mocks/serviceTerms.json";

const TermsService = ({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <Block
        padding={[theme.sizes.padding * 2, theme.sizes.padding]}
        space="between"
      >
        <Typography h2 light>
          Terms of Service
        </Typography>
        <ScrollView
          style={{
            marginVertical: theme.sizes.padding,
          }}
        >
          {serviceTerms.map((serviceTerm: { id: string; text: string }) => (
            <Typography
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
              key={serviceTerm.id}
            >
              {serviceTerm.id}. {serviceTerm.text}
            </Typography>
          ))}
        </ScrollView>

        <Block middle padding={[theme.sizes.base / 2, 0]}>
          <Button gradient onPress={onClick}>
            <Typography center white>
              I understand
            </Typography>
          </Button>
        </Block>
      </Block>
    </Modal>
  );
};

export default TermsService;

import { useState } from "react";

import { TERMS_SERVICE_CONSENT } from "../constants/keys";
import { DeviceStorage } from "../utils";

export const useConsent = async () => {
  const userConsent =
    (await DeviceStorage.getData(TERMS_SERVICE_CONSENT)) ?? false;

  const [consent, setConsentState] = useState(userConsent);

  const setConsent = () => {
    setConsentState(true);
    DeviceStorage.saveData(TERMS_SERVICE_CONSENT, "true");
  };

  return { consent, setConsent };
};

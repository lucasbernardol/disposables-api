import { _EMAIL_DOMAIN_DELIMITER } from "../constants.util";

export const domainParser = (email: string): string => {
  const splited = email.split(_EMAIL_DOMAIN_DELIMITER);

  if (splited.length > 1) {
    // ['example', "gmail.com"]
    return splited[splited.length - 1];
  }

  return "";
};

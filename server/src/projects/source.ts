import { Source, FroozenSource } from "../interfaces";

interface Injection {
  isValidIp: Function;
}

export default function buildMakeSource({ isValidIp }: Injection): Function {
  return function makeSource({ ip, browser, referrer }: Source): FroozenSource {
    if (!ip) {
      throw new Error("Project source must contain an IP.");
    }
    if (!isValidIp(ip)) {
      throw new RangeError("Project source must contain a valid IP.");
    }
    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser,
      getReferrer: () => referrer,
    });
  };
}

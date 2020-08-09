export function shortenAddress(pAddress, pDigits = 4) {
  const digestRegex = /^[a-z0-9-_]{43}$/i;
  if (digestRegex.test(pAddress)) {
    return `${pAddress.substring(0, pDigits + 2)}...${pAddress.substring(
      43 - pDigits
    )}`;
  } else {
    return pAddress;
  }
}

export function parseFileSize(pSize, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(pSize) < thresh) {
    return pSize + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    pSize /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(pSize) * r) / r >= thresh &&
    u < units.length - 1
  );

  return pSize.toFixed(dp) + " " + units[u];
}

export const APP_NAME = "ArGo";
export const APP_VERSION = "0.0.1";

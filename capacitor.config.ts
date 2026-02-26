import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.inkrealm.runway",  // Valid Java package format
  appName: "runway-static-viewer",
  webDir: "dist",
  server: {
    url: "https://inkrealm.info/runway",
    cleartext: false
  },
  android: {
    allowMixedContent: false
  }
};

export default config;

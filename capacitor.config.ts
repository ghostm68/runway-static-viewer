import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "app.lovable.859e2d20f99e47a8bd9df96c4e49f637",  // Keep this unique ID
  appName: "runway-static-viewer",
  webDir: "dist",
  server: {
    url: "https://inkrealm.info/runway",  // Your actual domain
    cleartext: false  // Set to false since you're using HTTPS
  },
  android: {
    allowMixedContent: false  // Disable since you're using HTTPS
  }
};

export default config;

import { registerRootComponent } from "expo";

import App from "./src/App";
// 환경변수 확인
console.warn("Environment Variables at Root:", {
  NAVER_CLIENT_ID: process.env.EXPO_PUBLIC_NAVER_CLIENT_ID,
});
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

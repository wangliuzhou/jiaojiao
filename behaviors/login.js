import { autoLogin } from "../utils/account";

const app = getApp();

module.exports = Behavior({
  attached() {
    autoLogin();
  }
});

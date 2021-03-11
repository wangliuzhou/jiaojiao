import { autoLogin } from "../utils/account";

const app = getApp();

module.exports = Behavior({
  attached() {
    if (!app.store.getState().userInfo) {
      autoLogin();
    }
  }
});

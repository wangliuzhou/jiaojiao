import { post } from "../../utils/request";
import { login } from "../../utils/account";
const app = getApp();

Component({
  externalClasses: ["my-class"],
  methods: {
    handleLogin(e) {
      let { errMsg, encryptedData, iv } = e.detail;
      if (errMsg === "getPhoneNumber:ok") {
        login({ encryptedData, iv });
      }
    }
  }
});

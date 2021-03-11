import { WXAPP_ENV } from "./config";
const app = getApp();
const Config = {
  base: {
    h5Domain: "http://localhost:8081",
    ossDomain: "http://static.xzintl.com/"
  },
  develop: {
    h5Domain: "http://192.168.100.38:8081"
  },
  trial: {
    h5Domain: "http://localhost:8081"
  }
};

const config = Object.assign({}, Config.base, Config[WXAPP_ENV || "release"]);

export default config;

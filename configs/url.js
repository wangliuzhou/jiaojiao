import { WXAPP_ENV } from "./config";
const ApiInfos = [
  { key: "/store/", service: "/api/store", dev: "http://192.168.100.115:8082" },
  { key: "/oss/", service: "/api/oss", dev: "http://192.168.100.115:8081" },
  {
    key: "/apply/",
    service: "/api/apply",
    dev: "http://192.168.100.115:8089"
  }
];

const genMap = ({ origin = "https://saas.xzintl.com", isDev = false } = {}) => {
  return ApiInfos.reduce((result, { key, service, dev }) => {
    result[key] = isDev ? [dev] : [origin + service];
    return result;
  }, {});
};

const CONFIG = {
  develop: {
    apiUrl: genMap({ isDev: true })
  },
  trial: {
    apiUrl: genMap({ origin: "https://saastest.xzintl.com" })
  },
  release: {
    apiUrl: genMap({ origin: "https://saas.xzintl.com" })
  }
};
let config = CONFIG[WXAPP_ENV];

export const getUrl = url => {
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  let domain = "";

  for (let key in config.apiUrl) {
    if (url.indexOf(key) === 0) {
      domain =
        config.apiUrl[key][
          Math.floor(Math.random() * config.apiUrl[key].length)
        ];
      break;
    }
  }

  return domain + url;
};

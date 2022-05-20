/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-25 21:36:23
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-13 16:58:11
 */
const responseBody: AnyObject = {
  message: "",
  timestamp: 0,
  result: null,
  code: 0,
};

export const builder = (
  data?: AnyObject,
  message?: any,
  code = 0,
  headers = {}
) => {
  responseBody.data = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody._status = code;
  }
  if (
    headers !== null &&
    typeof headers === "object" &&
    Object.keys(headers).length > 0
  ) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};

export const getQueryParameters = (options: AnyObject) => {
  const { url } = options;
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );
};

export const getBody = (options: AnyObject) => {
  return options.body && JSON.parse(options.body);
};

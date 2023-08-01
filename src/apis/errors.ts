import request from "@/utils/http";

const api = {
  getErrorsList: "/errors/list",
  
};

export default api;

export function getErrorsList(parameter: AnyObject) {
  return request({
    url: api.getErrorsList,
    method: "get",
    data: parameter,
  });
}

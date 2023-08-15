import request from "@/utils/http";

const api = {
  getErrorsList: "/errors/list",
  deleteError: "/errors/remove",
};

export default api;

export function getErrorsList(parameter: AnyObject) {
  return request({
    url: api.getErrorsList,
    method: "get",
    data: parameter,
  });
}

export function deleteError(parameter: AnyObject) {
  return request({
    url: api.deleteError,
    method: "post",
    data: parameter,
  });
}

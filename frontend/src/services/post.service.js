import http from "./api.service";

class postDataService {
  getPost() {
    return http.get("upload");
  }
  uploadPost(data, config) {
    return http.post("upload/", data, config);
  }
  getSinglePost(id) {
    return http.get(`upload/${id}`);
  }
  updatePost(id, data, config) {
    return http.put(`upload/${id}/`, data, config);
  }
  deletePost(id) {
    return http.delete(`upload/${id}`);
  }
}
export default new postDataService();

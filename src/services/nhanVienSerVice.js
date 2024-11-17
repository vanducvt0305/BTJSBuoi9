const BASE_URL = "https://6725e6b4c39fedae05b633ec.mockapi.io/nhanVien";

export const nhanVienService = {
  getNhanVien: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
  delNhanVien: (id) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "DELETE",
    });
  },

  addNhanVien: (nhanVien) => {
    return axios({
      url: BASE_URL,
      method: "POST",
      data: nhanVien,
    });
  },
  getNhanVienById: (id) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
  },
  updateNhanVien: (nhanVien) => {
    return axios({
      url: `${BASE_URL}/${nhanVien.id}`,
      method: "PUT",
      data: nhanVien,
    });
  },
};

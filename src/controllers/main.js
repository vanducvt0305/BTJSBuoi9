import NhanVien from "../model/nhanVien.js";
import { nhanVienService } from "../services/nhanVienSerVice.js";
import {
  kiemTraChucvu,
  kiemTraEmail,
  kiemTraLaChu,
  kiemTraLuongCoBan,
  kiemTraNgayLam,
  kiemTraPassword,
  kiemTraRong,
  kiemTraSo,
  kiemTraSoGioLam,
} from "../util/validation.js";

export const getElement = (selector) => {
  return document.querySelector(selector);
};
// Reset Form
const resetForm = () => {
  let IdNV = (getElement("#IdNV").value = "");
  let tenTK = (getElement("#tenTK").value = "");
  let tenNV = (getElement("#tenNV").value = "");
  let email = (getElement("#email").value = "");
  let matKhau = (getElement("#matKhau").value = "");
  let ngayLam = (getElement("#ngayLam").value = "");
  let luongCoBan = (getElement("#luongCoBan").value = "");
  let chucVu = (getElement("#chucVu").value = "");
  let gioLam = (getElement("#gioLam").value = "");
};
// Mở Model lên
let btnThemMoiNV = document.querySelector("#btnThemMoiNV");
let myModal = document.querySelector("#myModal");

btnThemMoiNV.onclick = () => {
  myModal.classList.remove("hidden");
  getElement("#btnCapNhat").disabled = true;
  getElement("#btnCapNhat").classList.add("bg-yelow-200");
  getElement("#btnCapNhat").classList.add("opacity-30");
  setTimeout(() => {
    myModal.classList.remove("top-[-110%]");
  }, 10);
};

// Đóng Model
// Đóng X
let rightCloseModel = document.querySelector("#rightCloseModel");
rightCloseModel.onclick = () => {
  resetForm();
  myModal.classList.add("hidden");
  getElement("#btnThem").disabled = false;
  getElement("#btnCapNhat").disabled = false;
  //   Xoá css cho nút thêm
  getElement("#btnThem").classList.remove("bg-blue-200");
  getElement("#btnThem").classList.remove("opacity-30");
  //   xoá css cho nút cập nhật
  getElement("#btnCapNhat").classList.remove("bg-yelow-200");
  getElement("#btnCapNhat").classList.remove("opacity-30");
};
// Đóng Model

let btnCloseModel = document.querySelector("#btnCloseModel");
btnCloseModel.onclick = () => {
  myModal.classList.add("hidden");
  resetForm();
  getElement("#btnThem").disabled = false;
  getElement("#btnCapNhat").disabled = false;
  //   Xoá css cho nút thêm
  getElement("#btnThem").classList.remove("bg-blue-200");
  getElement("#btnThem").classList.remove("opacity-30");
  //   xoá css cho nút cập nhật
  getElement("#btnCapNhat").classList.remove("bg-yelow-200");
  getElement("#btnCapNhat").classList.remove("opacity-30");
};

// Lấy thông tin nhân viên
const getInfo = () => {
  let IdNV = getElement("#IdNV").value;
  let tenTK = getElement("#tenTK").value;
  let tenNV = getElement("#tenNV").value;
  let email = getElement("#email").value;
  let matKhau = getElement("#matKhau").value;
  let ngayLam = getElement("#ngayLam").value;
  let luongCoBan = getElement("#luongCoBan").value;
  let chucVu = getElement("#chucVu").value;
  let gioLam = getElement("#gioLam").value;
  return new NhanVien(
    IdNV,
    tenTK,
    tenNV,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );
};

// Render nhân viên
const renderNhanVienList = (arrNhanVien) => {
  const content = arrNhanVien
    .map(
      (nhanVien) =>
        `
          <tr>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.id}</td>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.taiKhoan}</td>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.hoTen}</td>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.email} </td>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.ngayLam}</td>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.luongCoBan}</td>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.chucVu}</td>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.gioLam}</td>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.tongLuong}</td>
              <td class="border border-gray-300 px-4 py-2">${nhanVien.xepLoai}</td>
              <td>
                  <button type="button" class="py-2 px-4 bg-yellow-500 rounded-md" onclick="editNhanVien('${nhanVien.id}')">Sửa</button>
                  <button type="button" class="py-2 px-4 bg-red-500 rounded-md" onclick="delNhanVien('${nhanVien.id}')">Xóa</button>
              </td>
      `
    )
    .join(""); // join to concatenate all rows into a single string

  document.querySelector("#tbodyNhanVien").innerHTML = content;
};

const fetchNhanVienList = () => {
  nhanVienService
    .getNhanVien()
    .then((response) => {
      renderNhanVienList(response.data);
    })
    .catch((error) => {
      console.error("error: ", error);
    });
};

fetchNhanVienList();

// xóa nhân viên
const delNhanVien = (id) => {
  nhanVienService
    .delNhanVien(id)
    .then((response) => {
      alert("Đã xoá nhân viên thành công");
      fetchNhanVienList();
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

window.delNhanVien = delNhanVien;
// thêm nhân viên
const addNhanVien = () => {
  let getNhanVien = getInfo();
  let xepLoai = getNhanVien.xepLoai(getNhanVien.gioLam);
  let tongLuong = getNhanVien.tongLuong(
    getNhanVien.chucVu,
    getNhanVien.luongCoBan
  );
  let nhanVien = { ...getNhanVien, tongLuong, xepLoai };

  // Kiểm tra rỗng Tên tài khoản

  let isValid = kiemTraRong(
    nhanVien.taiKhoan,
    "#errTenTK",
    "Tên tài khoản không được để trống"
  );
  // Validate Tên nhân viên
  isValid &=
    kiemTraRong(
      nhanVien.taiKhoan,
      "#errTenTK",
      "Tên tài khoản không được để trống"
    ) &&
    kiemTraSo(
      nhanVien.taiKhoan,
      "#errTenTK",
      "Tên tài khoản phải là số và từ 4 tới 6 kí tự"
    );
  isValid &=
    kiemTraRong(
      nhanVien.hoTen,
      "#errTenNV",
      "Tên nhân viên không được để trống"
    ) && kiemTraLaChu(nhanVien.hoTen, "#errTenNV", "Tên nhân viên phải là chữ");
  isValid &=
    kiemTraRong(nhanVien.email, "#errEmail", "Email không được để trống") &&
    kiemTraEmail(nhanVien.email, "#errEmail", "Email không đúng định dạng");
  // Check Mật khẩu
  isValid &=
    kiemTraRong(
      nhanVien.matKhau,
      "#errMatKhau",
      "Mật khẩu không được để trống"
    ) &&
    kiemTraPassword(
      nhanVien.matKhau,
      "#errMatKhau",
      "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );
  // Validate Ngày làm
  isValid &=
    kiemTraRong(
      nhanVien.ngayLam,
      "#errNgayLam",
      "Ngày làm không được để trống"
    ) &&
    kiemTraNgayLam(
      nhanVien.ngayLam,
      "#errNgayLam",
      "Định dạng ngày làm phải là mm/dd/yyyy"
    );
  // Validate Lương cơ bản
  isValid &=
    kiemTraRong(
      nhanVien.luongCoBan,
      "#errLuongCoBan",
      "Lương cơ bản không được để trống"
    ) &&
    kiemTraLuongCoBan(
      nhanVien.luongCoBan,
      "#errLuongCoBan",
      "Lương cơ bản phải từ 10.000.000 tới 20.000.000"
    );
  // Validate chức vụ
  isValid &= kiemTraChucvu(
    nhanVien.chucVu,
    "#errChucVu",
    "Bạn phải chọn chức vụ"
  );
  // Validate Số giờ làm
  isValid &=
    kiemTraRong(
      nhanVien.gioLam,
      "#errGioLam",
      "Số giờ làm không được để trống"
    ) &&
    kiemTraSoGioLam(
      nhanVien.gioLam,
      "#errGioLam",
      "Số giờ làm phải từ 80-200 giờ"
    );

  if (isValid) {
    nhanVienService
      .addNhanVien(nhanVien)
      .then((response) => {
        myModal.classList.add("hidden");
        fetchNhanVienList();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
window.addNhanVien = addNhanVien;

// update nhân viên
const editNhanVien = (id) => {
  nhanVienService
    .getNhanVienById(id)
    .then((response) => {
      let nhanVienEdit = response.data;
      getElement("#IdNV").value = nhanVienEdit.id;
      getElement("#tenTK").value = nhanVienEdit.taiKhoan;
      getElement("#tenNV").value = nhanVienEdit.hoTen;
      getElement("#email").value = nhanVienEdit.email;
      getElement("#matKhau").value = nhanVienEdit.matKhau;
      getElement("#ngayLam").value = nhanVienEdit.ngayLam;
      getElement("#luongCoBan").value = nhanVienEdit.luongCoBan;
      getElement("#chucVu").value = nhanVienEdit.chucVu;
      getElement("#gioLam").value = nhanVienEdit.gioLam;
      getElement("#btnThem").disabled = true;
      getElement("#btnThem").classList.add("bg-blue-200");
      getElement("#btnThem").classList.add("opacity-30");
      myModal.classList.remove("hidden");
      setTimeout(() => {
        myModal.classList.remove("top-[-110%]");
      }, 10);

      //   Cập nhật thông tin theo form sau khi người dùng sửa thông tin nhân viên
      btnCapNhat.onclick = () => {
        let newNhanVien = getInfo();
        nhanVienService
          .updateNhanVien(newNhanVien)
          .then((response) => {
            resetForm();
            myModal.classList.add("hidden");
            fetchNhanVienList();
          })
          .catch((err) => {
            console.log(err);
          });
      };
    })
    .catch((err) => {
      console.log(err);
    });
};
window.editNhanVien = editNhanVien;

// Search Nhân viên

let searchElement = getElement("#search");
searchElement.onclick = () => {
  const keyword = getElement("#searchInput").value.trim().toLowerCase();
  nhanVienService
    .getNhanVien()
    .then((response) => {
      let nhanVienList = response.data;
      let result = nhanVienList.filter((nhanVien) => {
        return nhanVien.xepLoai.toLowerCase().includes(keyword);
      });
      if (result.length > 0) {
        renderNhanVienList(result);
      } else {
        alert("Không tìm thấy nhân viên phù hợp");
        renderNhanVienList([]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

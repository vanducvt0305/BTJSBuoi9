export default class NhanVien {
  constructor(
    id,
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  ) {
    this.id = id;
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
  }
  tongLuong(chucVu, luongCoBan) {
    let tongLuong;
    if (chucVu === "Giám đốc") {
      tongLuong = luongCoBan * 3;
    } else if (chucVu === "Trưởng phòng") {
      tongLuong = luongCoBan * 2;
    } else {
      tongLuong = luongCoBan;
    }
    return tongLuong;
  }
  xepLoai(gioLam) {
    let xepLoai;
    if (gioLam >= 192) {
      xepLoai = "Nhân viên xuất sắc";
    } else if (gioLam >= 176 && gioLam < 192) {
      xepLoai = "Nhân viên giỏi";
    } else if (gioLam >= 160 && gioLam < 176) {
      xepLoai = "Nhân viên khá";
    } else {
      xepLoai = "Nhân viên trung bình";
    }
    return xepLoai;
  }
}

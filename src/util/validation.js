import { getElement } from "../controllers/main.js";
// Kiểm tra rỗng
export const kiemTraRong = (value, idErr, message) => {
  if (value.trim() == "") {
    getElement(idErr).innerHTML = message;
    getElement(idErr).classList.add("text-red-500");
    return false;
  } else {
    getElement(idErr).innerHTML = "";
    return true;
  }
};

export const kiemTraSo = (value, idErr, message) => {
  let regex = /^\d{4,6}$/;
  const isNumber = regex.test(value);
  if (isNumber) {
    getElement(idErr).innerHTML = "";
    return true;
  } else {
    getElement(idErr).innerHTML = message;
    getElement(idErr).classList.add("text-red-500");
    return false;
  }
};

export const kiemTraLaChu = (value, idErr, message) => {
  let regex =
    /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/;
  const isText = regex.test(value);
  if (isText) {
    getElement(idErr).innerHTML = "";
    return true;
  } else {
    getElement(idErr).innerHTML = message;
    getElement(idErr).classList.add("text-red-500");
    return false;
  }
};
export const kiemTraEmail = (value, idErr, message) => {
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  let isEmail = regex.test(value);
  if (isEmail) {
    getElement(idErr).innerHTML = "";
    return true;
  } else {
    getElement(idErr).innerHTML = message;
    getElement(idErr).classList.add("text-red-500");
    return false;
  }
};
export const kiemTraPassword = (value, idErr, message) => {
  let regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()\-+=]).{6,10}$/;
  let OkayPassword = regex.test(value);
  if (OkayPassword) {
    getElement(idErr).innerHTML = "";
    return true;
  } else {
    getElement(idErr).innerHTML = message;
    getElement(idErr).classList.add("text-red-500");
    return false;
  }
};
export const kiemTraNgayLam = (value, idErr, message) => {
  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
  let OkayNgayLam = regex.test(value);
  if (OkayNgayLam) {
    getElement(idErr).innerHTML = "";
    return true;
  } else {
    getElement(idErr).innerHTML = message;
    getElement(idErr).classList.add("text-red-500");
    return false;
  }
};
export const kiemTraLuongCoBan = (value, idErr, message) => {
  let regex = /^(1[0-9]{7}|20000000)$/;
  let luongCoBan = regex.test(value);
  if (luongCoBan) {
    getElement(idErr).innerHTML = "";
    return true;
  } else {
    getElement(idErr).innerHTML = message;
    getElement(idErr).classList.add("text-red-500");
    return false;
  }
};
export const kiemTraChucvu = (value, idErr, message) => {
  if (value) {
    getElement(idErr).innerHTML = "";
    return true;
  } else {
    getElement(idErr).innerHTML = message;
    getElement(idErr).classList.add("text-red-500");
    return false;
  }
};
export const kiemTraSoGioLam = (value, idErr, message) => {
  let regex = /^(?:[8-9][0-9]|1[0-9]{2}|200)$/;
  let soGioLam = regex.test(value);
  if (soGioLam) {
    getElement(idErr).innerHTML = "";
    return true;
  } else {
    getElement(idErr).innerHTML = message;
    getElement(idErr).classList.add("text-red-500");
    return false;
  }
};

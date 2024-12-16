// Bài 1:

// Sử dụng Map để làm bảng khu vực và đối tượng để tối ưu hoá hiệu năng, dễ nhìn và dễ thay đổi sau này hơn.
// Bảng khu vực và đối tượng
const khuvuc_table = new Map([
  ["X", 0],
  ["A", 2],
  ["B", 1],
  ["C", 0.5],
]);

const doituong_table = new Map([
  ["1", 2.5],
  ["2", 1.5],
  ["3", 1],
  ["0", 0],
]);

// Assign button và result:
const result_daurot = document.getElementById("daurot");
const btn_tinhdiem = document.getElementById("btn-tinhdiemTS");

// Helper function: Đậu hay rớt
const dau_hay_rot = (diemTS, diemchuan) => diemTS >= diemchuan;

// Event listener - Giờ mới tới công chiện nè =))
btn_tinhdiem.addEventListener("click", () => {
  // Lấy giá trị nhập vào từ form
  const diemchuan = parseFloat(document.getElementById("b1-diemchuan").value);
  let diemTS = parseFloat(document.getElementById("b1-tongdiem").value);
  const khuvuc = document.getElementById("b1-khuvuc").value.trim();
  const doituong = document.getElementById("b1-doituong").value.trim();

  // Kiểm tra dữ liệu nhập hợp lệ
  if (isNaN(diemchuan) || isNaN(diemTS) || diemchuan < 0 || diemTS < 0) {
    result_daurot.innerHTML = `<h3 style="color:red">Vui lòng nhập lại điêm chuẩn và điểm thí sinh</h3>`;
    return;
  }

  if (!khuvuc_table.has(khuvuc) || !doituong_table.has(doituong)) {
    result_daurot.innerHTML = `<h3 style="color:red">Vui lòng chọn khu vực và đối tượng hợp lệ</h3>`;
    return;
  }

  // Cộng điểm ưu tiên
  diemTS += khuvuc_table.get(khuvuc) + doituong_table.get(doituong);

  // Xử lý kết quả
  const result = dau_hay_rot(diemTS, diemchuan);
  if (result) {
    result_daurot.innerHTML = `<h3 style="color:green">Đậu</h3>`;
  } else {
    result_daurot.innerHTML = `<h3 style="color:red">Rớt</h3>`;
  }
});

// Bài 2
// Tạo bảng tiền điện bằng array of object. cho thêm điện sản xuất lun
const tiendien_table = [
  {
    maxKW: 50,
    cost: new Map([
      ["dienGD", 500],
      ["dienSX", 600],
    ]),
  },
  {
    maxKW: 100, // 50kw tiếp theo
    cost: new Map([
      ["dienGD", 650],
      ["dienSX", 750],
    ]),
  },
  {
    maxKW: 200, // 100kw tiếp theo
    cost: new Map([
      ["dienGD", 850],
      ["dienSX", 950],
    ]),
  },
  {
    maxKW: 350, // 150kw tiếp theo
    cost: new Map([
      ["dienGD", 1100],
      ["dienSX", 1000],
    ]),
  },
  {
    maxKW: Infinity, // Còn lại
    cost: new Map([
      ["dienGD", 1300],
      ["dienSX", 1500],
    ]),
  },
];

const getTypeElectricity = () => {
  if (document.getElementById("dienGD").checked) return "dienGD";
  else if (document.getElementById("dienSX").checked) return "dienSX";
  return null;
};

const btn_tiendien = document.getElementById("btn-tinhtiendien");
btn_tiendien.addEventListener("click", () => {
  const tenKH = document.getElementById("b2-tenKH").value.trim();
  let soKW = document.getElementById("b2-soKW").value * 1;
  const tiendien = document.getElementById("b2-tiendien");
  const loaidien = getTypeElectricity();
  let e_cost = 0;

  if (!tenKH || !soKW || !loaidien) {
    tiendien.innerHTML = `<span style="color:red">Vui lòng nhập đủ thông tin</span>`;
    return;
  }

  // Tính số kw trong từng khoảng giá, dừng khi không còn vượt mức đang tính để tăng hiệu năng
  for (const range of tiendien_table) {
    if (soKW > 0) {
      let kwInRange;
      if (soKW < range.maxKW) {
        kwInRange = soKW;
      } else {
        kwInRange = range.maxKW;
      }

      e_cost += kwInRange * range.cost.get(loaidien);
      soKW -= kwInRange;
    } else {
      break;
    }
  }

  console.log(e_cost.toLocaleString(), tenKH);
  tiendien.innerHTML = `Tiền điện của <strong>${tenKH}</strong>: <strong>${e_cost.toLocaleString()} VND</strong>`;
});

// Bài 3
// Dùng array of object để tạo bảng thuế tiếp
const taxBrackets = [
  { maxIncome: 60, taxRate: 5 }, // Up to 60 triệu
  { maxIncome: 120, taxRate: 10 }, // từ 60 đến 120 triệu
  { maxIncome: 210, taxRate: 15 }, // từ 120 đến 210 triệu
  { maxIncome: 384, taxRate: 20 }, // từ 210 đến 384 triệu
  { maxIncome: 624, taxRate: 25 }, // từ 384 đến 624 triệu
  { maxIncome: 960, taxRate: 30 }, // từ 624 đến 960 triệu
  { maxIncome: Infinity, taxRate: 35 }, // Trên 960 triệu
];

// Tính thu nhập chịu thuế
const calculateTaxableIncome = (totalIncome, dependants) => {
  return totalIncome - 4 - dependants * 1.6; // Công thức đề cho
};

// Button click event
const btn_tinhthue = document.getElementById("btn-tinhthue");
btn_tinhthue.addEventListener("click", () => {
  const tenKH = document.getElementById("b3-tenKH").value;
  const thunhap = parseFloat(document.getElementById("b3-thunhap").value);
  const dependants = parseInt(document.getElementById("b3-dependants").value);
  const resultBox = document.getElementById("b3-tienthue");

  // Kiểm tra dữ liệu hợp lệ
  if (isNaN(thunhap) || isNaN(dependants) || thunhap < 0 || dependants < 0) {
    resultBox.innerHTML = `<p style="color:red;">Vui lòng nhập giá trị hợp lệ.</p>`;
    return;
  }

  // Tính thu nhập chịu thuế
  let taxedIncome = calculateTaxableIncome(thunhap, dependants);
  if (taxedIncome <= 0) {
    resultBox.innerHTML = `<p style="color:green;">Trẫm miễn thuế cho ${tenKH} đó, hahaha.</p>`;
    return;
  }

  // Tính
  let taxAmount = 0;

  for (const range of taxBrackets) {
    if (taxedIncome > 0) {
      const incomeInRange = Math.min(taxedIncome, range.maxIncome);
      taxAmount += (incomeInRange * range.taxRate) / 100;
      taxedIncome -= incomeInRange;
    } else {
      break;
    }
  }

  //  Kết quả
  resultBox.innerHTML = `<p style="color:green;">Thuế của ${tenKH}: ${taxAmount.toLocaleString()} triệu.</p>`;
});

// Bài 4
// Hàm tính hóa đơn cho khách hàng
calculateBill = (maKH, loaiKH, soKetNoi, soKenhCaoCap) => {
  let billAmount = 0;
  let processingFee = 0;
  let basicServiceFee = 0;
  let premiumChannelFee = 0;

  // Kiểm tra loại khách hàng
  if (loaiKH === "Nhà dân") {
    // Tính phí cho khách hàng nhà dân
    processingFee = 4.5;
    basicServiceFee = 20.5;
    premiumChannelFee = soKenhCaoCap * 7.5;
  } else if (loaiKH === "Doanh nghiệp") {
    // Tính phí cho khách hàng doanh nghiệp
    processingFee = 15;
    basicServiceFee = 75 + Math.max(0, soKetNoi - 10) * 5;
    premiumChannelFee = soKenhCaoCap * 50;
  } else {
    console.log("Loại khách hàng không hợp lệ!");
    return;
  }

  // Tính tổng hóa đơn
  billAmount = processingFee + basicServiceFee + premiumChannelFee;

  // ra kết quả
  const tienhoadon = document.getElementById("b4-tienhoadon");
  tienhoadon.textContent = `Hóa đơn cho khách hàng ${maKH}: $${billAmount.toFixed(
    2 // giới hạn số sau dấu "." cho đỡ tràn
  )}`;
};

// Làm khum kịp vụ hidden
const btnTinhHoaDon = document.getElementById("btn-tinhhoadon");
btnTinhHoaDon.addEventListener("click", () => {
  const maKH = document.getElementById("b4-maKH").value;
  const loaiKH = document.getElementById("b4-loaiKH").value;
  const soKetNoi = parseInt(document.getElementById("b4-soKetNoi").value);
  const soKenhCaoCap = parseInt(
    document.getElementById("b4-soKenhCaoCap").value
  );

  // Gọi hàm tính hóa đơn
  calculateBill(maKH, loaiKH, soKetNoi, soKenhCaoCap);
});

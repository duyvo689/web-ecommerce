// HÀM RANDOM TẠO MÃ ĐẶT LỊCH HẸN
export const createImgId =  () => {
  var result = "";
  var characters = "abcdefgh0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

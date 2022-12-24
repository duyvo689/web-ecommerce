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

// import { useRouter } from 'next/router'
// export const checkRouter=  () => {
//  const router = useRouter()
//   console.log(router)

// }

export const converToMoney = (num:any) => {
  if (typeof Intl === "undefined" || !Intl.NumberFormat) {
    console.log("This browser doesn't support Intl.NumberFormat");
  } else {
    var nf = Intl.NumberFormat();
    return nf.format(num)
  }
}

export const getInfoUser = () => {
    var userLocal: any = typeof window !== "undefined" ? localStorage.getItem("user") : "";
  var user = userLocal ? JSON.parse(userLocal) : null;
 return user;
}

export const checkInfoUser = () => {
    var userLocal: any = typeof window !== "undefined" ? localStorage.getItem("user") : "";
  var user = userLocal ? JSON.parse(userLocal) : null;
  if (user) {
   return true;
  } else {
    return false;
 }
}


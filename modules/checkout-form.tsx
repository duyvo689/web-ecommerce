import { ReactElement, useEffect, useState } from "react";
import Layout from "../layouts";
import { Tabs } from "flowbite-react";
import { supabase } from "../configs/supabase-client";
import toast from "react-hot-toast";
import router from "next/router";
import LoadingCenter from "../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { productsInterface } from "../values/interfaces";
import axios from "axios";
import { cartAction } from "../redux/actions/ReduxAction";
import { getInfoUser } from "../utils/funtions";

const fieldsOfForm: any = {
  name: "Vui lòng nhập tên người nhận!",
  phone: "Vui lòng nhập số điện thoại!",
  address: "Vui lòng nhập địa chỉ người nhận!",
};

interface THANHPHO {
  code: string;
  name: string;
  _id: string;
}

interface HUYEN {
  code: string;
  name: string;
  _id: string;
}

interface XA {
  code: string;
  name: string;
  path_with_type: string;
  _id: string;
}

export default function CheckOut() {
  const [load, setLoad] = useState<boolean>(false);
  const [thanhPho, setThanhPho] = useState<THANHPHO[]>();
  const [huyen, setHuyen] = useState<HUYEN[]>();
  const [xa, setXa] = useState<XA[]>();
  const [codeTp, setCodeTp] = useState<string>();
  const [codeH, setCodeH] = useState<string>();
  const [addressApi, setAddressApi] = useState<string>();
  const products: productsInterface[] = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const user = getInfoUser();

  const addNewOrder = async (event: any) => {
    event.preventDefault();
    setLoad(true);

    const _name = event.target.elements.name.value;
    const _phone = event.target.elements.phone.value;
    const _address = event.target.elements.address.value + "(" + addressApi + ")";
    const _description = event.target.elements.description.value;
    let _oderInfo = {
      name: _name,
      phone: _phone,
      address: _address,
      description: _description,
    };

    let isValid = validateForm(_oderInfo);
    if (!isValid) return;

    const { data: orderDb, error: err_order } = await supabase
      .from("orders")
      .insert(_oderInfo)
      .select()
      .single();

    let _detailOrderInfo = [];
    for (const product of products) {
      const order = {
        product_id: product.id,
        order_id: orderDb.id,
        total: product.total,
        price: product.total * product.price,
        user_id: user.id,
      };
      _detailOrderInfo.push(order);
    }
    console.log("_detailOrderInfo", _detailOrderInfo);
    const { data: detail_order, error: err_detail } = await supabase
      .from("detail_order")
      .insert(_detailOrderInfo);

    console.log(detail_order, err_detail);
    if (err_order != null && err_detail != null) {
      toast.error(err_order.message);
    } else if (orderDb) {
      toast.success(`Đặt hàng thành công`);
      dispatch(cartAction("cart", []));
      router.push("/stores");
    }
  };

  // Check validate
  function validateForm(form: any) {
    let fields = ["name", "phone", "address"];
    let i,
      l = fields.length;
    let fieldname;
    for (i = 0; i < l; i++) {
      fieldname = fields[i];
      if (!form[fieldname]) {
        toast.error(`Thiếu thông tin ${fieldsOfForm[fieldname]}`);
        return false;
      }
    }
    return true;
  }

  async function getAllTinhVn() {
    const data = await axios({
      method: "get",
      url: " https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1",
    });
    setThanhPho(data.data.data.data);
  }

  async function getAllHuyenOfTinhVn(code: string) {
    const data = await axios({
      method: "get",
      url: `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`,
    });
    setHuyen(data.data.data.data);
  }

  async function getAllXaOfHuyenOfTinhVn(code: string) {
    const data = await axios({
      method: "get",
      url: `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${code}&limit=-1`,
    });
    setXa(data.data.data.data);
  }

  useEffect(() => {
    getAllTinhVn();
  }, []);

  useEffect(() => {
    codeTp && getAllHuyenOfTinhVn(codeTp);
  }, [codeTp]);

  useEffect(() => {
    codeH && getAllXaOfHuyenOfTinhVn(codeH);
  }, [codeH]);

  return (
    <>
      {!load ? (
        <div className="max-w-[700px] block m-auto mt-10">
          <Tabs.Group aria-label="Tabs with underline" style="underline">
            <Tabs.Item active={true} title="Thanh toán khi giao hàng">
              <div className="bg-white">
                <div className="mt-10">
                  <form onSubmit={addNewOrder}>
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                      <div>
                        <h3
                          id="contact-info-heading"
                          className="text-lg font-medium text-gray-900"
                        >
                          Thông tin khách hàng
                        </h3>

                        <div className="mt-6">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tên khách hàng
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="name"
                              autoComplete="email"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số điện thoại
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="phone"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="mt-6">
                            <label
                              htmlFor="location"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Tỉnh (Thành phố)
                            </label>
                            <select
                              onChange={(e: any) => setCodeTp(e.target.value)}
                              id="location"
                              name="location"
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              defaultValue="Canada"
                            >
                              {thanhPho &&
                                thanhPho.length > 0 &&
                                thanhPho.map((item, index) => (
                                  <option value={item.code} key={index}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="mt-6">
                            <label
                              htmlFor="location"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Huyện (Quận)
                            </label>
                            <select
                              onChange={(e: any) => setCodeH(e.target.value)}
                              id="location"
                              name="location"
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              defaultValue="Canada"
                            >
                              {huyen &&
                                huyen.length > 0 &&
                                huyen.map((item, index) => (
                                  <option value={item.code} key={index}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="mt-6">
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Xã (Phường)
                          </label>
                          <select
                            onChange={(e: any) => setAddressApi(e.target.value)}
                            id="location"
                            name="location"
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            defaultValue="Canada"
                          >
                            {xa &&
                              xa.length > 0 &&
                              xa.map((item, index) => (
                                <option value={item.path_with_type} key={index}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="mt-6">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Địa chỉ giao hàng (Ghi rõ số nhà, thôn, xã, huyện, tp)
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="address"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Ghi chú
                          </label>
                          <div className="mt-1">
                            <textarea
                              rows={4}
                              name="description"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                        <button
                          type="submit"
                          className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                          Hoàn Thành
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Tabs.Item>
            {/* <Tabs.Item title="Thanh toán trực tuyến">Settings content</Tabs.Item> */}
          </Tabs.Group>
        </div>
      ) : (
        LoadingCenter()
      )}
    </>
  );
}

CheckOut.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

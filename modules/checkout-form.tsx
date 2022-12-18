import { ReactElement, useState } from "react";
import Layout from "../layouts";
import { Tabs } from "flowbite-react";
import { supabase } from "../configs/supabase-client";
import toast from "react-hot-toast";
import router from "next/router";
import LoadingCenter from "../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { productsInterface } from "../values/interfaces";

const fieldsOfForm: any = {
  name: "Vui lòng nhập tên người nhận!",
  phone: "Vui lòng nhập số điện thoại!",
  address: "Vui lòng nhập địa chỉ người nhận!",
};

export default function CheckOut() {
  const [load, setLoad] = useState<boolean>(false);
  const products: productsInterface[] = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  console.log(products);
  const addNewOrder = async (event: any) => {
    event.preventDefault();
    setLoad(true);

    const _name = event.target.elements.name.value;
    const _phone = event.target.elements.phone.value;
    const _address = event.target.elements.address.value;
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
        status: 1,
      };
      _detailOrderInfo.push(order);
    }
    console.log("_detailOrderInfo", _detailOrderInfo);
    const { data: detail_order, error: err_detail } = await supabase
      .from("detail_order")
      .insert(_detailOrderInfo);
    console.log("err_detail", err_detail);

    if (err_order != null && err_detail != null) {
      toast.error(err_order.message);
    } else if (orderDb) {
      toast.success(`Đặt hàng thành công`);
      // dispatch(servicesAction("services", services));
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
                        <div className="mt-6">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Địa chỉ giao hàng
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

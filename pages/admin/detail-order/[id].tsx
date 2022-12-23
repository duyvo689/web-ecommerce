import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import router, { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import LoadingCenter from "../../../components/loading";
import { supabase } from "../../../configs/supabase-client";
import Layout from "../../../layouts";
import { orderAction } from "../../../redux/actions/ReduxAction";
import { converToMoney } from "../../../utils/funtions";
import { orderDetailInterface } from "../../../values/interfaces";

function DetailOrder() {
  const { id } = useRouter().query;
  const [loading, setLoading] = useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState<orderDetailInterface[]>([]);
  const dispatch = useDispatch();
  const totalPrice = (order: any) => {
    let total = order.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue.price,
      0
    );
    return total;
  };
  async function getOrderDetail(idOrder: any) {
    try {
      let { data: detail_order, error } = await supabase
        .from("detail_order")
        .select("*,product_id(*)")
        .eq("order_id", idOrder);
      if (detail_order) {
        setOrderDetail(detail_order);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  async function xacNhanDonHang(idOrder: any) {
    let { data: detail_order, error } = await supabase
      .from("orders")
      .update({ confirm: true })
      .eq("id", idOrder);
    toast.success(`Đã xác nhận đơn hàng`);
    getListOrderAsync();
    router.push("/admin");
  }
  const getListOrderAsync = async () => {
    try {
      let { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      dispatch(orderAction("orders", orders));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrderDetail(id);
  }, []);
  return (
    <>
      {!loading ? (
        <div className="bg-white">
          <div className="mx-auto max-w-4xl py-6 px-4 ">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Đơn hàng</h1>

            <form className="mt-12">
              <div>
                <h2 className="sr-only">Items in your shopping cart</h2>

                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-t border-b border-gray-200"
                >
                  {orderDetail &&
                    orderDetail.length > 0 &&
                    orderDetail.map((product, productIdx) => (
                      <li key={product.id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                          <img
                            src={product.product_id.image[0]}
                            className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                          />
                        </div>

                        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div>
                            <div className="flex justify-between sm:grid sm:grid-cols-2">
                              <div className="pr-6">
                                <h3 className="text-sm">
                                  <span className="font-medium text-gray-700 hover:text-gray-800">
                                    {product.product_id.name}
                                  </span>
                                </h3>
                              </div>
                              <p className="text-right text-sm font-medium text-gray-900">
                                {product.product_id.price} VNĐ/ 1 sản phẩm
                              </p>
                            </div>
                            <p className="text-right text-sm font-medium text-gray-900 mt-6">
                              Tổng giá: {converToMoney(product.price)} VNĐ
                            </p>
                            <div className="mt-4 flex justify-center items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
                              <div className="flex justify-center items-center max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm">
                                {product.total ? product.total : 0}
                              </div>

                              <div className="ml-4 mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3">
                                <span>Số lượng</span>
                              </div>
                            </div>
                          </div>

                          <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                            <CheckIcon
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                            <span>Xác nhận</span>
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Order summary */}
              <div className="mt-10 sm:ml-32 sm:pl-6">
                <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                  <h2 className="sr-only">Order summary</h2>

                  <div className="flow-root">
                    <dl className="-my-4 divide-y divide-gray-200 text-sm">
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-gray-600">Tổng giá</dt>
                        <dd className="font-medium text-gray-900">
                          {converToMoney(totalPrice(orderDetail))} VNĐ
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-gray-600">Phí ship</dt>
                        <dd className="font-medium text-gray-900">30,000 VNĐ</dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-gray-600">Giảm giá</dt>
                        <dd className="font-medium text-gray-900">-00.000</dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-base font-medium text-gray-900">
                          Tổng đơn đặt hàng
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          {converToMoney(totalPrice(orderDetail) + 30000)} VNĐ
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="mt-10">
                  <div
                    onClick={() => xacNhanDonHang(id)}
                    className="w-full flex justify-center items-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Xác nhận đơn
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <LoadingCenter />
      )}
    </>
  );
}

DetailOrder.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default DetailOrder;

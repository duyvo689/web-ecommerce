import { ReactElement, useEffect } from "react";
import { supabase } from "../../configs/supabase-client";
import Layout from "../../layouts";
import { orderAction } from "../../redux/actions/ReduxAction";
import { useDispatch, useSelector } from "react-redux";

import { orderInterface } from "../../values/interfaces";
import { RootState } from "../../redux/reducers";
import moment from "moment";
import Link from "next/link";
import router from "next/router";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ListOrder() {
  const dispatch = useDispatch();
  const orderList: orderInterface[] = useSelector((state: RootState) => state.orders);
  var token: any = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token]);
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
    getListOrderAsync();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mt-4">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Tất cả đơn đặt hàng</h1>
          <p className="mt-2 text-sm text-gray-700">
            Quản lý các đơn đặt hàng của bạn tại đây.
          </p>
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div> */}
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full border-separate overflow-x-scroll overflow-hidden"
                style={{ borderSpacing: 0 }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Tên
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Điện thoại
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Địa chỉ
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Ngày đặt
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Mô tả
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Tình trạng
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Chi Tiết</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {orderList &&
                    orderList.length > 0 &&
                    orderList.map((person, personIdx) => (
                      <tr key={person.id}>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          )}
                        >
                          {person.name}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                          )}
                        >
                          {person.phone}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
                          )}
                        >
                          {person.address}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "px-3 py-4 text-sm text-gray-500 hidden lg:table-cell "
                          )}
                        >
                          {moment(person.created_at).format("DD/MM/YYYY")}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            " px-3 py-4 text-sm text-gray-500"
                          )}
                        >
                          {person.description ? person.description : "Không có lời nhắc"}
                        </td>
                        {person.confirm ? (
                          <td className="text-green-500 px-3 py-4 text-sm text-gray-500">
                            Đã xác nhận
                          </td>
                        ) : (
                          <td className="text-red-600 px-3 py-4 text-sm text-gray-500">
                            Chưa xác nhận
                          </td>
                        )}
                        <td
                          className={classNames(
                            personIdx !== people.length - 1
                              ? "border-b border-gray-200"
                              : "",
                            "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                          )}
                        >
                          <Link href={`/admin/detail-order/${person.id}`}>
                            <div className="text-indigo-600 hover:text-indigo-900">
                              Chi tiết
                            </div>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ListOrder.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

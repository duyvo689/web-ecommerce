import { Tabs } from "flowbite-react";
import NextLink from "next/link";
import router from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../configs/supabase-client";

export default function Login() {
  const [load, setLoad] = useState<boolean>(false);

  // const signup = async (event: any) => {
  //   event.preventDefault();
  //   setLoad(true);

  //   const _name = event.target.elements.name.value;
  //   const _phone = event.target.elements.phone.value;
  //   const _address = event.target.elements.address.value;
  //   const _description = event.target.elements.description.value;
  //   let _oderInfo = {
  //     name: _name,
  //     phone: _phone,
  //     address: _address,
  //     description: _description,
  //   };

  //   // let isValid = validateForm(_oderInfo);
  //   // if (!isValid) return;

  //   const { data: orderDb, error: err_order } = await supabase
  //     .from("orders")
  //     .insert(_oderInfo)
  //     .select()
  //     .single();

  //   let _detailOrderInfo = [];
  //   for (const product of products) {
  //     const order = {
  //       product_id: product.id,
  //       order_id: orderDb.id,
  //       status: 1,
  //     };
  //     _detailOrderInfo.push(order);
  //   }
  //   console.log("_detailOrderInfo", _detailOrderInfo);
  //   const { data: detail_order, error: err_detail } = await supabase
  //     .from("detail_order")
  //     .insert(_detailOrderInfo);
  //   console.log("err_detail", err_detail);

  //   if (err_order != null && err_detail != null) {
  //     toast.error(err_order.message);
  //   } else if (orderDb) {
  //     toast.success(`Đặt hàng thành công`);
  //     // dispatch(servicesAction("services", services));
  //     router.push("/stores");
  //   }
  // };

  // Check validate
  // function validateForm(form: any) {
  //   let fields = ["name", "phone", "address"];
  //   let i,
  //     l = fields.length;
  //   let fieldname;
  //   for (i = 0; i < l; i++) {
  //     fieldname = fields[i];
  //     if (!form[fieldname]) {
  //       toast.error(`Thiếu thông tin ${fieldsOfForm[fieldname]}`);
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  return (
    <div className="flex justify-around">
      <Tabs.Group aria-label="Full width tabs">
        <Tabs.Item title="Đăng Nhập">
          <div className="bg-white">
            <main className="overflow-hidden mt-20">
              {/* Contact section */}
              <section className="relative bg-white" aria-labelledby="contact-heading">
                <div
                  className="absolute h-1/2 w-full bg-warm-gray-50"
                  aria-hidden="true"
                />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="relative bg-white shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      {/* Contact information */}
                      <div className="relative overflow-hidden bg-gradient-to-b from-teal-500 to-teal-600 py-10 px-6 sm:px-10 xl:p-12">
                        {/* Decorative angle backgrounds */}
                        <div
                          className="pointer-events-none absolute inset-0 sm:hidden"
                          aria-hidden="true"
                        >
                          <svg
                            className="absolute inset-0 h-full w-full"
                            width={343}
                            height={388}
                            viewBox="0 0 343 388"
                            fill="none"
                            preserveAspectRatio="xMidYMid slice"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                              fill="url(#linear1)"
                              fillOpacity=".1"
                            />
                            <defs>
                              <linearGradient
                                id="linear1"
                                x1="254.553"
                                y1="107.554"
                                x2="961.66"
                                y2="814.66"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#fff" />
                                <stop offset={1} stopColor="#fff" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div
                          className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
                          aria-hidden="true"
                        >
                          <svg
                            className="absolute inset-0 h-full w-full"
                            width={359}
                            height={339}
                            viewBox="0 0 359 339"
                            fill="none"
                            preserveAspectRatio="xMidYMid slice"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                              fill="url(#linear2)"
                              fillOpacity=".1"
                            />
                            <defs>
                              <linearGradient
                                id="linear2"
                                x1="192.553"
                                y1="28.553"
                                x2="899.66"
                                y2="735.66"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#fff" />
                                <stop offset={1} stopColor="#fff" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div
                          className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
                          aria-hidden="true"
                        >
                          <svg
                            className="absolute inset-0 h-full w-full"
                            width={160}
                            height={678}
                            viewBox="0 0 160 678"
                            fill="none"
                            preserveAspectRatio="xMidYMid slice"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                              fill="url(#linear3)"
                              fillOpacity=".1"
                            />
                            <defs>
                              <linearGradient
                                id="linear3"
                                x1="192.553"
                                y1="325.553"
                                x2="899.66"
                                y2="1032.66"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#fff" />
                                <stop offset={1} stopColor="#fff" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      {/* Contact form */}
                      <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                        <h3 className="text-3xl font-semibold text-warm-gray-900">
                          Đăng nhập
                        </h3>
                        <form
                          action="#"
                          method="POST"
                          className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 min-w-[500px]"
                        >
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="subject"
                              className="block text-sm font-medium text-warm-gray-900"
                            >
                              Họ và Tên
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="subject"
                                id="subject"
                                className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="subject"
                              className="block text-sm font-medium text-warm-gray-900"
                            >
                              Mật Khẩu
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                name="subject"
                                id="subject"
                                className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2 sm:flex sm:justify-end">
                            <button
                              type="submit"
                              className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                            >
                              Đăng Nhập
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Đăng Kí">
          <div className="bg-white">
            <main className="overflow-hidden mt-20">
              {/* Contact section */}
              <section className="relative bg-white" aria-labelledby="contact-heading">
                <div
                  className="absolute h-1/2 w-full bg-warm-gray-50"
                  aria-hidden="true"
                />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="relative bg-white shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      {/* Contact information */}
                      <div className="relative overflow-hidden bg-gradient-to-b from-teal-500 to-teal-600 py-10 px-6 sm:px-10 xl:p-12">
                        {/* Decorative angle backgrounds */}
                        <div
                          className="pointer-events-none absolute inset-0 sm:hidden"
                          aria-hidden="true"
                        >
                          <svg
                            className="absolute inset-0 h-full w-full"
                            width={343}
                            height={388}
                            viewBox="0 0 343 388"
                            fill="none"
                            preserveAspectRatio="xMidYMid slice"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                              fill="url(#linear1)"
                              fillOpacity=".1"
                            />
                            <defs>
                              <linearGradient
                                id="linear1"
                                x1="254.553"
                                y1="107.554"
                                x2="961.66"
                                y2="814.66"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#fff" />
                                <stop offset={1} stopColor="#fff" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div
                          className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
                          aria-hidden="true"
                        >
                          <svg
                            className="absolute inset-0 h-full w-full"
                            width={359}
                            height={339}
                            viewBox="0 0 359 339"
                            fill="none"
                            preserveAspectRatio="xMidYMid slice"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                              fill="url(#linear2)"
                              fillOpacity=".1"
                            />
                            <defs>
                              <linearGradient
                                id="linear2"
                                x1="192.553"
                                y1="28.553"
                                x2="899.66"
                                y2="735.66"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#fff" />
                                <stop offset={1} stopColor="#fff" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div
                          className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
                          aria-hidden="true"
                        >
                          <svg
                            className="absolute inset-0 h-full w-full"
                            width={160}
                            height={678}
                            viewBox="0 0 160 678"
                            fill="none"
                            preserveAspectRatio="xMidYMid slice"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                              fill="url(#linear3)"
                              fillOpacity=".1"
                            />
                            <defs>
                              <linearGradient
                                id="linear3"
                                x1="192.553"
                                y1="325.553"
                                x2="899.66"
                                y2="1032.66"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#fff" />
                                <stop offset={1} stopColor="#fff" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      {/* Contact form */}
                      <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                        <h3 className="text-3xl font-semibold text-warm-gray-900">
                          Nhập đầy đủ thông tin để tạo tài khoản
                        </h3>
                        <form
                          action="#"
                          method="POST"
                          className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                        >
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="subject"
                              className="block text-sm font-medium text-warm-gray-900"
                            >
                              Họ và Tên
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="subject"
                                className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="subject"
                              className="block text-sm font-medium text-warm-gray-900"
                            >
                              Địa chỉ
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="address"
                                id="subject"
                                className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-warm-gray-900"
                            >
                              Email
                            </label>
                            <div className="mt-1">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-warm-gray-900"
                              >
                                Số điện thoại
                              </label>
                            </div>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="phone"
                                id="phone"
                                autoComplete="tel"
                                className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                aria-describedby="phone-optional"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="subject"
                              className="block text-sm font-medium text-warm-gray-900"
                            >
                              Mật khẩu
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                name="password"
                                id="subject"
                                className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2 sm:flex sm:justify-end">
                            <button
                              type="submit"
                              className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                            >
                              Đăng Kí
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </Tabs.Item>
      </Tabs.Group>
      <NextLink href={"/"} passHref>
        <div className=" h-[60px] flex items-center font-medium cursor-pointer text-gray-500">
          Về Trang Chủ
        </div>
      </NextLink>
    </div>
  );
}

import { ReactElement } from "react";
import Layout from "../layouts";
import NextLink from "next/link";
const products = [
  {
    id: 1,
    name: "High Wall Tote",
    href: "#",
    price: "$210.00",
    color: "White and black",
    size: "15L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, white handles, and black drawstring top.",
  },
  // More products...
];

export default function CheckOut() {
  return (
    <div className="bg-white">
      <div className="max-w-[700px] block m-auto mt-10">
        <form>
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <div>
              <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
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
                    type="email"
                    id="email-address"
                    name="email-address"
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
                    type="email"
                    id="email-address"
                    name="phone"
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
                  Địa chỉ giao hàng
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="phone"
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
                  Ghi chú
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    id="email-address"
                    name="phone"
                    autoComplete="email"
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
  );
}

CheckOut.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

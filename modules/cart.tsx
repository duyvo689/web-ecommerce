import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layouts";
import { cartAction } from "../redux/actions/ReduxAction";
import { RootState } from "../redux/reducers";
import { productsInterface } from "../values/interfaces";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { converToMoney } from "../utils/funtions";

export default function Cart() {
  const products: productsInterface[] = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const remoteProductInCart = (pro: productsInterface) => {
    const newProduct = products.filter((product) => product.id != pro.id);
    dispatch(cartAction("cart", newProduct));
    toast.success("Đã xoá sản phẩm khỏi giỏ hàng");
  };

  const totalPrice = (pros: any) => {
    let total = 0;
    total = pros.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + currentValue.price * currentValue.total,
      0
    );
    return total;
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Giỏ Hàng Của Bạn
        </h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {products && products.length > 0 ? (
                products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image[0]}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <a className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </a>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {converToMoney(product.price * product.total)} VNĐ
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <p className="flex items-center space-x-2 text-sm text-gray-700">
                          (
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                          )<span>Số lượng: {product.total ? product.total : 10}</span>
                        </p>
                        <div className="ml-4">
                          <button
                            onClick={() => remoteProductInCart(product)}
                            type="button"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            <span>Xoá Sản Phẩm</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="flex justify-center items-center h-[200px]">
                  Chưa có sản phẩm nào trong giỏ hàng!
                </div>
              )}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Tổng giá tiền:</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    {converToMoney(totalPrice(products))} VNĐ
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10">
              {products && products.length > 0 ? (
                <NextLink href={`/checkout`} passHref>
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Thanh Toán
                  </button>
                </NextLink>
              ) : (
                <button
                  disabled
                  className="w-full rounded-md border border-transparent bg-gray-500 py-3 px-4 text-base font-medium text-white"
                >
                  Thanh Toán
                </button>
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

Cart.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

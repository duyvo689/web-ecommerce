import { ReactElement, useEffect, useState } from "react";
import LoadingCenter from "../components/loading";
import { supabase } from "../configs/supabase-client";
import Layout from "../layouts";
import { checkInfoUser, converToMoney, getInfoUser } from "../utils/funtions";
import { orderDetailInterface, productsInterface } from "../values/interfaces";
import NextLink from "next/link";
import { Tabs } from "flowbite-react";
import { HeartIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import moment from "moment";

export default function User() {
  const user = getInfoUser();
  const [orders, setOrders] = useState<orderDetailInterface[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const getOrder = async () => {
    try {
      let { data, error } = await supabase
        .from("detail_order")
        .select("*,product_id(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) {
        setOrders(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getProduct = async () => {
    try {
      let { data, error } = await supabase
        .from("favourites")
        .select("*,product_id(*)")
        .eq("user_id", user.id);
      console.log(data);
      if (data) {
        setProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unFavourites = async (productId: string) => {
    let check = checkInfoUser();
    if (!check) {
      toast.error(`Bạn cần đăng nhập trước khi thực hiện thao tác`);
      return;
    }
    const { data, error } = await supabase.from("favourites").delete().match({
      user_id: user.id,
      product_id: productId,
    });
    await getProduct();
    toast.success("Đã xoá sản phẩm khỏi mục yêu thích");
  };
  useEffect(() => {
    getOrder();
    getProduct();
  }, []);

  return (
    <>
      {user ? (
        <main className="relative z-0 flex-1  focus:outline-none xl:order-last">
          <article>
            <div>
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-28">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div className="flex">
                    <img
                      className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                      src={user.avatar}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                  <h1 className="truncate text-2xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <h5 className="truncate text-md text-gray-900">{user.phone}</h5>
                  <h5 className="truncate text-md  text-gray-900">{user.email}</h5>
                  <h5 className="truncate text-md  text-gray-900">{user.address}</h5>
                </div>
              </div>
            </div>
            <div className="mt-6 max-w-5xl px-4 sm:px-6 lg:px-8 m-auto">
              <Tabs.Group aria-label="Tabs with icons" style="underline">
                <Tabs.Item active={true} title="Đơn hàng của tôi">
                  <div className="mt-6 ">
                    <div className="mt-8">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {orders && orders.length > 0 ? (
                          orders.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.product_id.image[0]}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <NextLink
                                        href={`/product-detail/${product.product_id.id}`}
                                      >
                                        <span>{product.product_id.name}</span>
                                      </NextLink>
                                    </h3>
                                    <p className="ml-4">
                                      {converToMoney(product.price)} VNĐ
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-700">
                                    Số lượng: {product.total}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-700">
                                    Ngày đặt hàng:{" "}
                                    {moment(product.created_at).format("DD/MM/yyyy")}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <div className="mt-20 text-gray-600 mb-40">
                            Bạn chưa có đơn hàng nào!
                          </div>
                        )}
                      </ul>
                    </div>
                  </div>
                </Tabs.Item>
                <Tabs.Item title="Sản phẩm yêu thích">
                  {" "}
                  <div className="mt-6 ">
                    <div className="mt-8">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {products && products.length > 0 ? (
                          products.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.product_id.image[0]}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <NextLink
                                        href={`/product-detail/${product.product_id.id}`}
                                      >
                                        <span>{product.product_id.name}</span>
                                      </NextLink>
                                    </h3>
                                    <button
                                      onClick={() => unFavourites(product.product_id.id)}
                                      type="button"
                                      className="font-[400] text-red-600 hover:text-indigo-500"
                                    >
                                      Xoá sản phẩm
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex gap-6 mt-10 ml-10">
                                    <HeartIcon
                                      className="text-red-600 h-6 w-6 flex-shrink-0 cursor-pointer"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <div className="mt-20 text-gray-600 mb-40">
                            Bạn chưa có sản phẩm yêu thích nào!
                          </div>
                        )}
                      </ul>
                    </div>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </article>
        </main>
      ) : (
        <LoadingCenter />
      )}
    </>
  );
}

User.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

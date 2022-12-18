import { ReactElement, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Layout from "../layouts";
import { supabase } from "../configs/supabase-client";
import { useRouter } from "next/router";
import { productsInterface } from "../values/interfaces";
import { productsDefault } from "../values/default-values";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { cartAction } from "../redux/actions/ReduxAction";
import toast from "react-hot-toast";
import LoadingCenter from "../components/loading";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const router = useRouter();
  const productId = router.query.id as string;
  const [product, setProduct] = useState<productsInterface>();
  const dispatch = useDispatch();
  const productInCart: productsInterface[] = useSelector(
    (state: RootState) => state.cart
  );
  useEffect(() => {
    if (productId) getProductById(productId);
  }, [productId]);

  const getProductById = async (idPro: String) => {
    try {
      let { data: products, error } = await supabase
        .from("products")
        .select("*,category_id(*)")
        .eq("id", idPro);
      if (products) setProduct(products[0]);
      console.log(error);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = (prod: any) => {
    dispatch(cartAction("cart", [...productInCart, prod]));
    toast.success("Đã thêm sản phẩm vào của hàng");
  };

  return (
    <>
      {product ? (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image gallery */}
              <Tab.Group as="div" className="flex flex-col-reverse">
                {/* Image selector */}
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                  <Tab.List className="grid grid-cols-4 gap-6">
                    {product &&
                      product.image.map((item) => (
                        <Tab
                          key={item}
                          className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                          {({ selected }) => (
                            <>
                              <span className="sr-only"> {item} </span>
                              <span className="absolute inset-0 overflow-hidden rounded-md">
                                <img
                                  src={item}
                                  alt=""
                                  className="h-full w-full object-cover object-center"
                                />
                              </span>
                              <span
                                className={classNames(
                                  selected ? "ring-indigo-500" : "ring-transparent",
                                  "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>
                      ))}
                  </Tab.List>
                </div>

                <Tab.Panels className="aspect-w-1  aspect-h-1 w-full">
                  {product.image.map((item) => (
                    <Tab.Panel key={item}>
                      <img
                        src={item}
                        alt={item}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {product.name}
                </h1>

                <div className="mt-3">
                  <p className="text-3xl tracking-tight text-gray-900">
                    {product.price} VNĐ
                  </p>
                </div>

                <div className="mt-6">
                  <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                <form className="mt-6">
                  <div className="sm:flex-col1 mt-10 flex">
                    <div
                      onClick={() => addToCart(product)}
                      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    >
                      Thêm Vào Giỏ Hàng
                    </div>
                  </div>
                </form>

                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>

                  <div className="divide-y divide-gray-200 border-t"></div>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : (
        LoadingCenter()
      )}
    </>
  );
}

ProductDetail.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

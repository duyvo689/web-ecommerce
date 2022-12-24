import { useEffect, useState } from "react";
import { supabase } from "../configs/supabase-client";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { productsInterface } from "../values/interfaces";
import { RootState } from "../redux/reducers";
import { productTrendAction } from "../redux/actions/ReduxAction";

export default function HomeTrendingProduct() {
  const dispatch = useDispatch();
  const trendingProducts: productsInterface[] = useSelector(
    (state: RootState) => state.productTrend
  );

  useEffect(() => {
    trendingProducts.length == 0 && getProductTrend();
  }, []);

  const getProductTrend = async () => {
    const { data, error } = await supabase.from("products").select().eq("trend", true);
    console.log(data);
    if (data) {
      dispatch(productTrendAction("productTrend", data));
    }
  };
  return (
    <section aria-labelledby="trending-heading" className="bg-white">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:py-32 lg:px-8">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2
            id="trending-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Sản phẩm bán chạy
          </h2>
          <NextLink href={`/stores`} passHref>
            <span className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
              Xem nhiều hơn
              <span aria-hidden="true"> &rarr;</span>
            </span>
          </NextLink>
        </div>

        <div className="relative mt-8">
          <div className="relative w-full overflow-x-auto">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
            >
              {trendingProducts &&
                trendingProducts.length > 0 &&
                trendingProducts.map((product, index) => (
                  <NextLink key={index} href={`/product-detail/${product.id}`} passHref>
                    <li
                      key={index}
                      className="inline-flex w-64 flex-col text-center lg:w-auto"
                    >
                      <div className="group relative">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                          <img
                            src={product.image[0]}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <div className="mt-6">
                          <p className="text-sm text-gray-500">Sản phẩm ưa thích</p>
                          <h3 className="mt-1 font-semibold text-gray-900">
                            <span className="absolute inset-0" />
                            {product.name}
                          </h3>
                          <p className="mt-1 text-gray-900">{product.price}</p>
                        </div>
                      </div>

                      <h4 className="sr-only">Available colors</h4>
                    </li>
                  </NextLink>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 px-4 sm:hidden">
          <NextLink href={`/stores`} passHref>
            <span className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              See everything
              <span aria-hidden="true"> &rarr;</span>
            </span>
          </NextLink>
        </div>
      </div>
    </section>
  );
}

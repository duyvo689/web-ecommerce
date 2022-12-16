import { ReactElement } from "react";
import Layout from "../layouts";
import NextLink from "next/link";
import { productsInterface } from "../values/interfaces";

interface Props {
  productList: productsInterface[];
  id: string;
}

export default function Products({ productList, id }: Props) {
  const newListpr = productList.filter((item: any) => item.category_id == id);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-2 px-4 sm:py-10 sm:px-4 lg:max-w-7xl lg:px-8">
        <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {newListpr.map((product) => (
            <NextLink href={`/product-detail/${product.id}`} passHref>
              <div key={product.id} className="group relative">
                <div className="min-h-80 w-[260px] aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.image[0]}
                    alt={product.image[0]}
                    className="h-full w-full object-fill lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            </NextLink>
          ))}
        </div>
      </div>
    </div>
  );
}

Products.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

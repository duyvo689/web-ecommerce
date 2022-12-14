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
import { checkInfoUser, getInfoUser } from "../utils/funtions";
import InputComment from "../components/input-comment";
import { HeartIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const router = useRouter();
  const productId = router.query.id as string;
  const [product, setProduct] = useState<productsInterface>();
  const [comments, setComments] = useState<any[]>([]);
  const [soLuong, setSoLuong] = useState<number>(10);
  const dispatch = useDispatch();
  const [like, setLike] = useState<boolean>(false);
  const productInCart: productsInterface[] = useSelector(
    (state: RootState) => state.cart
  );
  const user = getInfoUser();

  useEffect(() => {
    if (productId) getProductById(productId);
  }, [productId]);
  useEffect(() => {
    getComment(productId);
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
    let check = checkInfoUser();
    if (!check) {
      toast.error(`Bạn cần đăng nhập trước khi thực hiện thao tác`);
      return;
    }
    let pro: productsInterface = { ...prod, total: soLuong };
    dispatch(cartAction("cart", [...productInCart, pro]));
    toast.success("Đã thêm sản phẩm vào của hàng");
  };

  const getComment = async (id: string) => {
    const { data, error } = await supabase
      .from("comments")
      .select("*,user_id(*)")
      .eq("product_id", id);
    if (data) {
      setComments(data);
    }
  };

  const checkFavourites = async () => {
    let check = checkInfoUser();
    if (!check) {
      return;
    }
    const { data, error } = await supabase.from("favourites").select("*").match({
      user_id: user.id,
      product_id: productId,
    });
    if (data && data?.length > 0) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  useEffect(() => {
    checkFavourites();
  }, [productId, user]);

  const addFavourites = async () => {
    let check = checkInfoUser();
    if (!check) {
      toast.error(`Bạn cần đăng nhập trước khi thực hiện thao tác`);
      return;
    }
    setLike(true);
    toast.success("Đã thêm sản phẩm vào mục yêu thích");
    const { data, error } = await supabase
      .from("favourites")
      .insert({
        product_id: productId,
        user_id: user.id,
      })
      .select();
  };

  const unFavourites = async () => {
    let check = checkInfoUser();
    if (!check) {
      toast.error(`Bạn cần đăng nhập trước khi thực hiện thao tác`);
      return;
    }
    setLike(false);
    toast.success("Đã xoá sản phẩm khỏi mục yêu thích");
    const { data, error } = await supabase.from("favourites").delete().match({
      user_id: user.id,
      product_id: productId,
    });
    console.log(error);
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
                      product.image.map((item, index) => (
                        <Tab
                          key={index}
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
                <div className="flex gap-6">
                  <div className="flex gap-6 mt-10">
                    <div className="font-bold">Số lượng</div>
                    <select
                      onChange={(e: any) => setSoLuong(e.target.value)}
                      className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={10}>10</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value={200}>200</option>
                      <option value={500}>500</option>
                      <option value={1000}>1000</option>
                      <option value={2000}>2000</option>
                    </select>
                  </div>
                  <div className="flex gap-6 mt-10">
                    <HeartIcon
                      onClick={() => {
                        like ? unFavourites() : addFavourites();
                      }}
                      className={classNames(
                        like ? "text-red-600" : "text-gray-400",
                        "h-10 w-10 flex-shrink-0 cursor-pointer"
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <form className="mt-6">
                  <div className="sm:flex-col1 mt-10 flex">
                    <div
                      onClick={() => addToCart(product)}
                      className="flex cursor-pointer max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
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
      {product && (
        <InputComment productId={product.id} getComment={() => getComment(productId)} />
      )}
      <div className="mt-10 ml-[150px]">
        <div className="font-semibold">Nhận xét:</div>

        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex gap-4 mt-6">
              <img src={comment.user_id.avatar} className="w-12 h-12" />
              <div className="mt-1">
                <span className="text-[16px] text-gray-600">{comment.comment}</span>
                <div className="flex gap-4 mt-2">
                  {comment.image &&
                    comment.image.length > 0 &&
                    comment.image.map((item: any, index: any) => (
                      <img
                        key={index}
                        src={item}
                        className="w-32 h-24 rounded-md overflow-hidden object-cover"
                      />
                    ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Chưa có nhận xét nào!</div>
        )}
      </div>
    </>
  );
}

ProductDetail.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

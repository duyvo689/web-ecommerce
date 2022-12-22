import { Button } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../configs/supabase-client";
import Layout from "../../layouts";
import { categoryAction } from "../../redux/actions/ReduxAction";
import { RootState } from "../../redux/reducers";
import { createImgId } from "../../utils/funtions";
import { categoryInterface } from "../../values/interfaces";

export default function AddProduct() {
  const dispatch = useDispatch();
  const categoryList: categoryInterface[] = useSelector(
    (state: RootState) => state.category
  );
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getCategoriesAsync();
  }, []);

  const getCategoriesAsync = async () => {
    try {
      let { data: category, error } = await supabase.from("category").select("*");
      dispatch(categoryAction("category", category));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event: any) => {
    setLoading(true);
    try {
      event.preventDefault();
      const name = event.target.elements.name.value;
      const price = event.target.elements.price.value;
      const category = event.target.elements.category.value;
      const description = event.target.elements.description.value;

      const arrImage = await uploadImageProduct();
      const { data, error } = await supabase.from("products").insert([
        {
          name: name,
          price: price,
          category_id: category,
          description: description,
          image: arrImage,
        },
      ]);
      toast.success(`Đã thêm sản phẩm`);
      event.target.reset();
      setImages([]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const uploadImageProduct = async () => {
    try {
      if (images && images.length > 0) {
        const fileExts = images.map((file) => file.name.split(".").pop());
        const filePath = fileExts.map((fileExt) => `${createImgId()}.${fileExt}`);
        let publicUrls: string[] = [];
        for (let i = 0; i < filePath.length; i++) {
          let { error: uploadError } = await supabase.storage
            .from("products")
            .upload(filePath[i], images[i], { upsert: true });
          if (uploadError) {
            console.log(uploadError);
          }
          const publicUrl = await supabase.storage
            .from("products")
            .getPublicUrl(filePath[i]);
          publicUrls.push(publicUrl.data.publicUrl);
        }
        console.log(publicUrls);
        return publicUrls;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeteleImg = (name: string) => {
    console.log(name);
    let arrImg = images.filter((img) => img.name != name);
    setImages(arrImg);
  };
  return (
    <>
      <form className="space-y-8 divide-gray-200 mb-20" onSubmit={handleSubmit}>
        <div className="space-y-8 divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 mt-10">
                Thêm sản phẩm
              </h3>
            </div>

            <div className="pt-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên sản phẩm
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nhập giá sản phẩm
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Chọn phân loại sản phẩm
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {categoryList &&
                        categoryList.map((category, index) => (
                          <option key={index} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Mô tả sản phẩm
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700"
              >
                Thêm hình ảnh sản phẩm
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={(e: any) => setImages([...images, ...e.target.files])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* list hinh */}
            {images &&
              images.length > 0 &&
              images.map((item, index) => (
                <div
                  onClick={() => {
                    handleDeteleImg(item.name);
                  }}
                >
                  <img
                    src={URL.createObjectURL(item)}
                    className="h-20 w-32 object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        <Button className="mt-4" type="submit">
          {loading ? "Đang thêm sản phẩm..." : "Thêm sản phẩm"}
        </Button>
      </form>
      {/* <button onClick={uploadImageProduct}>duyvo</button> */}
    </>
  );
}

AddProduct.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

import { Fragment, useRef, useState } from "react";
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { checkInfoUser, createImgId, getInfoUser } from "../utils/funtions";
import toast from "react-hot-toast";
import { supabase } from "../configs/supabase-client";

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  productId: string;
  getComment: () => void;
}

export default function InputComment({ productId, getComment }: Props) {
  const [selected, setSelected] = useState(moods[5]);
  const user = getInfoUser();
  const upImg = useRef<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [load, setLoad] = useState<boolean>(false);

  const addComment = async (event: any) => {
    event.preventDefault();
    try {
      setLoad(true);
      const _comment = event.target.elements.comment.value;
      let arrImage = await uploadImageProduct();
      if (!arrImage) arrImage = [];
      if (!_comment) return;
      let check = checkInfoUser();
      if (!check) {
        toast.error(`Bạn cần đăng nhập trước khi thực hiện thao tác`);
        return;
      }
      const _info = {
        comment: _comment,
        user_id: user.id,
        product_id: productId,
        image: arrImage,
      };
      const { data, error } = await supabase.from("comments").insert(_info).select();
      getComment();
      console.log(data, error);
      setImages([]);
      event.target.reset();
      toast.success(`Đã thêm nhận xét`);
    } catch (error) {
    } finally {
      setLoad(false);
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
        return publicUrls;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeteleImg = (name: string) => {
    let arrImg = images.filter((img) => img.name != name);
    setImages(arrImg);
  };
  const handleClick = () => {
    upImg.current.click();
  };
  return (
    <>
      <div className="flex items-start space-x-4 max-w-[600px] ml-[100px]">
        <div className="flex-shrink-0">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={
              user
                ? user.avatar
                : "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w"
            }
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <form action="#" className="relative" onSubmit={addComment}>
            <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <label htmlFor="comment" className="sr-only">
                Thêm nhận xét...
              </label>
              <textarea
                rows={3}
                name="comment"
                id="comment"
                className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                placeholder="Thêm nhận xét..."
                defaultValue={""}
              />

              {/* Spacer element to match the height of the toolbar */}
              <div className="py-2" aria-hidden="true">
                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <div className="flex items-center space-x-5">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <PaperClipIcon
                      onClick={handleClick}
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                    <input
                      ref={upImg}
                      type="file"
                      hidden
                      multiple
                      onChange={(e: any) => setImages([...images, ...e.target.files])}
                    />
                  </button>
                </div>
                <div className="flex items-center">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="sr-only"> Your mood </Listbox.Label>
                        <div className="relative">
                          <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                            <span className="flex items-center justify-center">
                              {selected.value === null ? (
                                <span>
                                  <FaceSmileIcon
                                    className="h-5 w-5 flex-shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only"> Add your mood </span>
                                </span>
                              ) : (
                                <span>
                                  <span
                                    className={classNames(
                                      selected.bgColor,
                                      "flex h-8 w-8 items-center justify-center rounded-full"
                                    )}
                                  >
                                    <selected.icon
                                      className="h-5 w-5 flex-shrink-0 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <span className="sr-only">{selected.name}</span>
                                </span>
                              )}
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                              {moods.map((mood, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    classNames(
                                      active ? "bg-gray-100" : "bg-white",
                                      "relative cursor-default select-none py-2 px-3"
                                    )
                                  }
                                  value={mood}
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={classNames(
                                        mood.bgColor,
                                        "w-8 h-8 rounded-full flex items-center justify-center"
                                      )}
                                    >
                                      <mood.icon
                                        className={classNames(
                                          mood.iconColor,
                                          "flex-shrink-0 h-5 w-5"
                                        )}
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <span className="ml-3 block truncate font-medium">
                                      {mood.name}
                                    </span>
                                  </div>
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {load ? "Đăng đăng..." : "Đăng"}
                </button>
              </div>
            </div>
          </form>
          <div className="flex grap-4 mt-4">
            {images &&
              images.length > 0 &&
              images.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleDeteleImg(item.name);
                  }}
                >
                  <img
                    src={URL.createObjectURL(item)}
                    className="h-20 w-20 mr-2 rounded-lg object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { TextInput } from "flowbite-react";
import { supabase } from "../configs/supabase-client";
import { categoryInterface } from "../values/interfaces";
import { categoryAction } from "../redux/actions/ReduxAction";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Props {
  isOpen: boolean;
  setOpen(value: boolean): void;
  category: categoryInterface;
}
export default function ModalEditCategory({ isOpen, setOpen, category }: Props) {
  const id = category.id;
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(category.name);
  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => {
    setName(category.name);
  }, [category]);
  const getCategoriesAsync = async () => {
    try {
      let { data: category, error } = await supabase.from("category").select("*");
      dispatch(categoryAction("category", category));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      setLoad(true);
      const { data, error } = await supabase
        .from("category")
        .update({ name: name })
        .eq("id", id);
      await getCategoriesAsync();
      toast.success(`Đã chỉnh sửa danh mục`);
      setName("");
      setOpen(false);
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Chỉnh sửa tên danh mục
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <TextInput
                          id="category"
                          type="text"
                          required={true}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={handleUpdate}
                  >
                    {load ? "Đang cập nhập..." : "Chỉnh sửa"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Huỷ bỏ
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

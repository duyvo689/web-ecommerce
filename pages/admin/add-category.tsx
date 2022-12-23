import { Button, Label, Table, TextInput } from "flowbite-react";
import React, { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ModalEditCategory from "../../components/modal-edit-category";
import { supabase } from "../../configs/supabase-client";
import Layout from "../../layouts";
import { categoryAction } from "../../redux/actions/ReduxAction";
import { RootState } from "../../redux/reducers";
import { categoryInterface } from "../../values/interfaces";

function AddNewCategory() {
  const [open, setOpen] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [category, setCategory] = useState<any>();
  const dispatch = useDispatch();
  const categoryList: categoryInterface[] = useSelector(
    (state: RootState) => state.category
  );
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoadingAdd(true);
      const name = event.target.elements.category.value;
      let { data: category, error } = await supabase
        .from("category")
        .insert({ name: name })
        .select("*")
        .single();
      if (category) {
        categoryList.unshift(category);
      }
      toast.success(`Đã thêm danh mục`);
      event.target.reset();
    } catch (error) {
    } finally {
      setLoadingAdd(false);
    }
  };

  useEffect(() => {
    getCategoriesAsync();
  }, []);

  const handleOpen = (item: categoryInterface) => {
    setOpen(!open);
    setCategory(item);
  };
  const getCategoriesAsync = async () => {
    try {
      let { data: category, error } = await supabase.from("category").select("*");
      dispatch(categoryAction("category", category));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-10">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Tên danh mục" value="Tên danh mục" />
          </div>
          <TextInput
            id="category"
            type="text"
            required={true}
            placeholder="Tên danh mục"
          />
        </div>
        <Button type="submit" className="mt-4">
          {!loadingAdd ? "Thêm danh mục" : "Đang thêm danh mục..."}
        </Button>
      </form>
      {/*  */}
      <div className="col-span-2">
        <Table>
          <Table.Head>
            <Table.HeadCell>STT</Table.HeadCell>
            <Table.HeadCell>Tên</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {categoryList &&
              categoryList.length > 0 &&
              categoryList.map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => handleOpen(item)}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Chỉnh sửa
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      {category && (
        <ModalEditCategory isOpen={open} setOpen={setOpen} category={category} />
      )}
    </div>
  );
}
AddNewCategory.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default AddNewCategory;

import { Button, Label, Table, TextInput } from "flowbite-react";
import React, { ReactElement, useEffect, useState } from "react";
import ModalEditCategory from "../../components/modal-edit-category";
import { supabase } from "../../configs/supabase-client";
import Layout from "../../layouts";
import {
  getCategoriesStore,
  insertCategoryStore,
} from "../../stores/reducers/categorySlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { categoryDefault } from "../../values/default-values";
import { categoryInterface } from "../../values/interfaces";

function AddNewCategory() {
  const dispatch = useAppDispatch();
  const categoryList: categoryInterface[] = useAppSelector(
    (state: any) => state.categories.categories
  );
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<categoryInterface>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const name = event.target.elements.category.value;
    dispatch(insertCategoryStore(name));
  };
  useEffect(() => {
    if (!categoryList || categoryList.length <= 0) {
      dispatch(getCategoriesStore());
    }
  }, []);

  const handleOpen = (item: categoryInterface) => {
    setOpen(!open);
    setCategory(item);
  };
  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Tên danh mục" value="Tên danh mục" />
          </div>
          <TextInput id="category" type="text" required={true} />
        </div>
        <Button type="submit" className="mt-4">
          Thêm danh mục
        </Button>
      </form>
      {/*  */}
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
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
      {category && (
        <ModalEditCategory isOpen={open} setOpen={setOpen} category={category} />
      )}
    </div>
  );
}
AddNewCategory.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default AddNewCategory;

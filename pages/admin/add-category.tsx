import { Button, Label, TextInput } from "flowbite-react";
import React, { ReactElement } from "react";
import Layout from "../../layouts";

function AddNewCategory() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@flowbite.com"
          required={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required={true} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
AddNewCategory.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default AddNewCategory;

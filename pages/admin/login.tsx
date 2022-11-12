import React from "react";
import { Button, Checkbox, Label, Navbar, TextInput } from "flowbite-react";
import { supabase } from "../../configs/supabase-client";
import router from "next/router";

const login = () => {
  const signInWithEmail = async (event: any) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data, error);
    if (data.session) {
      router.push("/admin");
    }
  };
  return (
    <div className="max-w-[50%] m-auto block mt-20 text-center">
      <h2 className="font-bold text-xl mb-6">ĐĂNG NHẬP VÀO ADMIN</h2>
      <form className="flex flex-col gap-4" onSubmit={signInWithEmail}>
        <div>
          <div className="mb-2 block text-start">
            <Label htmlFor="email1" value="Nhập email" />
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            placeholder="name@flowbite.com"
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-start">
            <Label htmlFor="password" value="Nhập mật khẩu" />
          </div>
          <TextInput id="password" name="password" type="password" required={true} />
        </div>

        <Button className="mt-4" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default login;

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { productsInterface, userInterface } from "../values/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { Dropdown } from "flowbite-react";

const navigation = {
  other: [
    { name: "Trang Chủ", href: "/" },
    { name: "Cửa Hàng", href: "/stores" },
    { name: "Thông Tin Cửa Hàng", href: "/about" },
    { name: "Liên Hệ", href: "/contact" },
  ],
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderNavbar() {
  const productInCart: productsInterface[] = useSelector(
    (state: RootState) => state.cart
  );

  var userLocal: any = typeof window !== "undefined" ? localStorage.getItem("user") : "";
  var user = userLocal ? JSON.parse(userLocal) : null;
  return (
    <div className="bg-white z-50">
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex flex-1">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
                <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
                  {navigation.other.map((item) => (
                    <NextLink
                      key={item.name}
                      href={item.href}
                      passHref
                      className="flex whitespace-nowrap items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {item.name}
                    </NextLink>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex flex-1 items-center justify-end">
                {/* <NextLink href={"/"} passHref></NextLink> */}
                <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                  <div className="mr-6 flow-root lg:ml-8">
                    <NextLink href="/cart" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      {productInCart.length == 0 ? (
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          0
                        </span>
                      ) : (
                        <span className="p-1 w-6 h-6 text-black items-center flex justify-center rounded-full bg-red-500 ml-2 text-sm font-medium  group-hover:text-white">
                          {productInCart.length}
                        </span>
                      )}
                      <span className="sr-only">items in cart, view bag</span>
                    </NextLink>
                  </div>
                  {user ? (
                    <>
                      <Dropdown label={user.name}>
                        <Dropdown.Header>
                          <NextLink href="/user">
                            <div className="flex gap-2 items-center">
                              <img src={user.avatar} className="w-10 h-10" />
                              <span>
                                <span className="block text-sm"> {user.name}</span>
                                <span className="block text-sm font-medium truncate">
                                  {user.email}
                                </span>
                              </span>
                            </div>
                          </NextLink>
                        </Dropdown.Header>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                          {" "}
                          <a
                            onClick={() => {
                              localStorage.removeItem("user");
                            }}
                            href="/"
                          >
                            Đăng Xuất
                          </a>
                        </Dropdown.Item>
                      </Dropdown>
                    </>
                  ) : (
                    <NextLink href={"/login"} passHref>
                      <span className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        Đăng Nhập
                      </span>
                    </NextLink>
                  )}
                </div>
                {/* Cart */}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

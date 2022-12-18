import NextLink from "next/link";
export default function HomeHeroHeader() {
  return (
    <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 mt-20 ">
      <div className=" mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div className="sm:max-w-lg">
          <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Sử Dụng Bì Giấy Để Chung Tay Bảo Vệ Môi Trường
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Chất liệu giấy tái chế được dùng trong sản xuất bao bì này có hai loại đó
            chính là giấy kraft và giấy carton. Đây là hai loại giấy dùng được sản xuất từ
            nguồn nguyên liệu là 100% bột giấy nên có khả năng tái chế khá nhiều lần và
            còn an toàn với môi trường xung quanh khi phân hủy.
          </p>
        </div>
        <div>
          <div className="mt-20">
            <div className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/4 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                      <img
                        src="https://xuonginbacviet.vn/wp-content/uploads/2021/04/4_8_2021-3_02_11-PM-min.png"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://bizweb.dktcdn.net/100/339/225/files/bao-bi-ghep-giay.jpg?v=1625127992010"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://khangthanh.com/upload/news/4-dieu-can-biet-ve-tinh-chat-hut-am-cua-giay-trong-san-xuat-bao-bi2.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://inkhanlanh.vn/wp-content/uploads/2021/06/bao-bi-giay.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://www.in7.com.vn/uploads/files/2019/06/19/bao-bi-don-gian-dem-lai-nhieu-thien-cam.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://anhsang.edu.vn/wp-content/uploads/in-hop-giay-1-min-1.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://ingianguyen.com/wp-content/uploads/in-hop-giay-theo-yeu-cau-900x850.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NextLink href={`/stores`} passHref>
              <span className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-10 text-center font-medium text-white hover:bg-indigo-700">
                Mua Sản Phẩm
              </span>
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}

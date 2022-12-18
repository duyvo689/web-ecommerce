import { LifebuoyIcon, NewspaperIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import Layout from "../layouts";

const supportLinks = [
  {
    name: "Đội ngũ nhân viên",
    href: "#",
    description:
      "Hiện tại, doanh nghiệp chúng tôi với đội ngũ chính là maketing và kỹ thuật viên nhiều kinh nghiệm. Dưới sự lãnh đạo tài tình và sáng suốt của bản quản trị. Cùng nhau cung cấp các sản phẩm tốt nhất đến với người tiêu dùng.",
    icon: PhoneIcon,
  },
  {
    name: "Sản phẩm",
    href: "#",
    description:
      "Chuyên về lĩnh vực sản xuất in ấn , cung cấp các loại bao bì dành cho thực phẩm, bánh kẹo. Chất lượng cao, uy tín, chất lượng, liên hệ ngay. Chất Lượng Cao. Mẫu Mã Đẹp. Giá Rẻ, Cạnh Tranh. Giao Hàng Toàn Quốc.",
    icon: LifebuoyIcon,
  },
  {
    name: "Nhà máy sản xuất",
    href: "#",
    description:
      "GIỚI THIỆU NHÀ MÁY Tọa lạc trên diện tích 10.000 mét vuông, diện tích nhà xưởng xây dựng đạt 6.000 mét vuông với hai dây chuyền sản xuất hiện đại. Hiện tại, nhà máy Sản Xuất Bao Bì DuyDuy có hơn 250 công nhân viên, bao gồm khoảng 200 công nhân sản xuất và bảo trì (bao gồm cả tổ trưởng), 30 kỹ sư phụ trách sản.",
    icon: NewspaperIcon,
  },
];

export default function AboutUs() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-gray-800 pb-32">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://inbaobigiay.vn/wp-content/uploads/2016/11/in-t%C3%BAi-gi%E1%BA%A5y-m%E1%BA%AFt-c%C3%A1o-1024x502.jpg"
            alt=""
          />
          <div
            className="absolute inset-0 bg-gray-800 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Công Ty Cổ Phần Sản Xuất Bao Bì Giấy DuyDuy
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Thành lập từ năm 2020, Công Ty Cổ Phần Sản Xuất Bao Bì Giấy DuyDuy là một
            trong những công ty hàng đầu tại Tp. HCM trong lĩnh vực bán lẻ và phân phối
            các sản phẩm về giấy tái chế bảo vệ môi trường số một tại thành phố HCM p.
          </p>
        </div>
      </div>

      {/* Overlapping cards */}
      <section
        className="relative z-10 mx-auto -mt-32 max-w-7xl px-4 pb-32 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <h2 className="sr-only" id="contact-heading">
          Liên hệ
        </h2>
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
          {supportLinks.map((link) => (
            <div key={link.name} className="flex flex-col rounded-2xl bg-white shadow-xl">
              <div className="relative flex-1 px-6 pt-16 pb-8 md:px-8">
                <div className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-indigo-600 p-5 shadow-lg">
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">{link.name}</h3>
                <p className="mt-4 text-base text-gray-500">{link.description}</p>
              </div>
              <div className="rounded-bl-2xl rounded-br-2xl bg-gray-50 p-6 md:px-8">
                <a
                  href={link.href}
                  className="text-base font-medium text-indigo-700 hover:text-indigo-600"
                >
                  Liên hệ<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
AboutUs.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

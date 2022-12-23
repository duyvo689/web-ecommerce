const features = [
  {
    name: "Thân thiện với môi trường",
    description:
      "Bao bì thân thiện môi trường là xu hướng được nhiều doanh nghiệp quan tâm hiện nay, việc sử dụng các loại bao bì thân thiện môi trường – bao bì xanh không chỉ góp phần vào việc giảm thiểu tác nhân gây ảnh hưởng xấu đến môi trường mà còn mang nhiều lợi ích thiết thực cho các doanh nghiệp về: tiết kiệm chi phí, xây dựng chiến lược phát triển thương hiệu bền vững,…",
    imageSrc:
      "https://resshell.com/wp-content/uploads/2019/07/hop-giay-dung-thuc-an-nhanh-chat-luong-cao-cua-viet-in-2.jpg",
    imageAlt:
      "White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.",
  },
  {
    name: "Xu hướng toàn cầu",
    description:
      "Theo các khảo sát, đánh giá và thống kê, thị trường bao bì xanh đã và đang có tốc độ tăng trưởng ổn định trên toàn cầu. Bao bì xanh là xu hướng bao bì thân thiện với môi trường, phát triển bền vững. Các giải pháp cho xu hướng bao bì này là tái chế nguyên vật liệu, tái sử dụng sản phẩm và bao bì phân hủy nhanh.",
    imageSrc: "https://invietdung.com/upload/in-tui-giay-xi-mang(2)2.png",
    imageAlt: "Detail of zipper pull with tan leather and silver rivet.",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
function HomeExhibition() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Sản phẩm báo bì giấy tái chế
          </h2>
          <p className="mt-4 text-gray-500">
            Bao bì giấy tái chế là một trong những xu hướng đang được các đơn vị kinh
            doanh, sản xuất hàng hóa ngày nay lựa chọn và nhận được nhiều ủng hộ.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {features.map((feature, featureIdx) => (
            <div
              key={featureIdx}
              className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
            >
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? "lg:col-start-1"
                    : "lg:col-start-8 xl:col-start-9",
                  "mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4"
                )}
              >
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
              </div>
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? "lg:col-start-6 xl:col-start-5"
                    : "lg:col-start-1",
                  "flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8"
                )}
              >
                <div className="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeExhibition;

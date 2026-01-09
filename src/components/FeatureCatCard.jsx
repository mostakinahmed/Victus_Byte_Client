import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const dummyCategories = [
  {
    id: 1,
    title: "Winter Collections",
    items: [
      {
        name: "Comforters",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Electric Kettle",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Moisturizers",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Water Heaters",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
    ],
  },
  {
    id: 2,
    title: "Islamic Accessories",
    items: [
      {
        name: "Dates (Khurma)",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Jaynamaz",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Hajj Kits",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Fragrances",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
    ],
  },
  {
    id: 3,
    title: "Beauty & Health",
    items: [
      {
        name: "Personal Care",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Beauty Tools",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Shaving",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Skin Care",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
    ],
  },
  {
    id: 4,
    title: "Infant & Kids Zone",
    items: [
      {
        name: "Baby Care",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Kids Toys",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Winter Care",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
      {
        name: "Diapering",
        img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
      },
    ],
  },
];

const CategoryBox = ({ data }) => {
  return (
    <div
      className="bg-white p-4 border border-gray-100 
     hover:shadow-lg hover:z-10"
    >
      <h3 className="text-gray-700 font-semibold mb-4 text-[16px]">
        {data.title}
      </h3>

      {/* 2x2 Image Grid */}
      <div className="grid grid-cols-2 gap-3">
        {data.items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center  cursor-pointer">
            <div className="bg-gray-100 p-2 rounded w-32 aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="object-contain  transition-transform"
              />
            </div>
            <span className="text-[14px] text-gray-600 hover:text-blue-600 mt-2 text-center leading-tight">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      {/* 
      <button className="text-blue-500 text-xs font-medium mt-4 flex items-center hover:underline">
        See More <FiChevronRight className="ml-0.5" />
      </button> */}
    </div>
  );
};

const MultiCategorySection = () => {
  return (
    <div className="max-w-[1400px] mx-auto mt-3 px-4">
      {/* Section Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {dummyCategories.map((cat) => (
          <CategoryBox key={cat.id} data={cat} />
        ))}
      </div>

      {/* Slider Controls (Visual Only for this layout) */}
      {/* <button className="absolute left-1 top-1/2 -translate-y-1/2 bg-white shadow-xl p-2 rounded-full hidden group-hover:block border border-gray-200 z-10">
        <FiChevronLeft size={24} className="text-gray-400" />
      </button>
      <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-white shadow-xl p-2 rounded-full hidden group-hover:block border border-gray-200 z-10">
        <FiChevronRight size={24} className="text-gray-400" />
      </button> */}
    </div>
  );
};

export default MultiCategorySection;

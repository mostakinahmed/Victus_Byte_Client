import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const dummyCategories = [
  {
    id: 1,
    title: "Computer Accesories",
    items: [
      {
        name: "Graphics Card",
        img: "https://www.startech.com.bd/image/cache/catalog/graphics-card/msi/gt-730/gt-730-01-500x500.webp",
      },
      {
        name: "Motherboard",
        img: "https://www.startech.com.bd/image/cache/catalog/motherboard/gigabyte/b450m-k/b450m-k-01-500x500.webp",
      },
      {
        name: "Power Supply",
        img: "https://www.startech.com.bd/image/cache/catalog/power-supply/t-wolf/atx-350/atx-350w-04-500x500.webp",
      },
      {
        name: "RAM",
        img: "https://www.startech.com.bd/image/cache/catalog/component/ram/team/delta-8gb/8gb-500x500.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Storage Device",
    items: [
      {
        name: "M.2 SSD (NVMe)",
        img: "https://www.startech.com.bd/image/cache/catalog/ssd/colorful/cn600/cn600-01-500x500.webp",
      },
      {
        name: "SATA SSD",
        img: "https://www.startech.com.bd/image/cache/catalog/ssd/netac/ls-ne-sa500/ls-ne-sa500-01-500x500.webp",
      },
      {
        name: "HDD",
        img: "https://www.startech.com.bd/image/cache/catalog/hdd/seagate/2tb-7200rpm/2tb-7200rpm-1-500x500.jpg",
      },
      {
        name: "Pendrive",
        img: "https://www.startech.com.bd/image/cache/catalog/pendrive/adata/uc310-128gb/uc310-128gb-01-500x500.webp",
      },
    ],
  },
  {
    id: 3,
    title: "Smart Device",
    items: [
      {
        name: "Mobile",
        img: "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a55/galaxy-a55-02-500x500.webp",
      },
      {
        name: "Smart Watch",
        img: "https://www.startech.com.bd/image/cache/catalog/smart-watch/havit/m9035/m9035-black-01-500x500.webp",
      },
      {
        name: "EurBuds",
        img: "https://www.startech.com.bd/image/cache/catalog/earbuds/oneplus/nord-buds-3-pro/nord-buds-3%20pro-01-500x500.webp",
      },
      {
        name: " Power Bank",
        img: "https://www.startech.com.bd/image/cache/catalog/power-bank/joyroom/jr-l002/jr-l002-01-500x500.webp",
      },
    ],
  },
  {
    id: 4,
    title: "Electronics",
    items: [
      {
        name: "Monitor",
        img: "https://www.startech.com.bd/image/cache/catalog/monitor/pc-power/pcgm-king22/pcgm-king22-01-500x500.webp",
      },
      {
        name: "TV Box",
        img: "https://www.startech.com.bd/image/cache/catalog/tv-box/tx3/tx3-mini-a/tx3-mini-a-0001-500x500.jpg",
      },
      {
        name: "Electric Kettle",
        img: "https://www.startech.com.bd/image/cache/catalog/gadget/daily-lifestyle/smart/sek-s18es/sek-s18es-0001-500x500.webp",
      },
      {
        name: "IP Camera",
        img: "https://www.startech.com.bd/image/cache/catalog/ip-camera/hikvision/hilook-ipc-b121h-c/hilook-ipc-b121h-c-01-500x500.webp",
      },
    ],
  },
];

const CategoryBox = ({ data }) => {
  return (
    <div
      className="bg-white md:p-4 p-2 border border-gray-100 
     hover:shadow-lg hover:z-10"
    >
      <h3 className="text-gray-700 font-semibold mb-4 text-[16px]">
        {data.title}
      </h3>

      {/* 2x2 Image Grid */}
      <div className="grid grid-cols-2 md:gap-3 gap-2">
        {data.items.map((item, idx) => (
          <div
            key={idx}
            className="flex text-center flex-col items-center  cursor-pointer"
          >
            <Link to={`/${item.name.toLowerCase()}`}>
              <div className="bg-gray-100 p-3 mb-1 rounded w-32 aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="object-contain  transition-transform"
                />
              </div>
              <span className="text-[14px] text-center text-gray-600 hover:text-blue-600 mt-2 leading-tight">
                {item.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
      
      <button className="text-blue-500 text-xs font-medium mt-4 flex items-center hover:underline">
        See More <FiChevronRight className="ml-0.5" />
      </button>
    </div>
  );
};

const MultiCategorySection = () => {
  return (
    <div className="max-w-[1400px] font-sans mx-auto mt-3 md:px-4 px-2">
      {/* - flex-nowrap: Keeps all items on one line
        - overflow-x-auto: Enables horizontal swiping
        - snap-x snap-mandatory: Makes cards "stick" into place when scrolling
        - no-scrollbar: Custom class to hide the scrollbar (defined below)
        - sm:grid: Switches to normal grid on tablets/desktop
      */}
      <div
        className="flex flex-nowrap overflow-x-auto md:gap-3 gap-2 md:pb-3 no-scrollbar snap-x snap-mandatory
                      sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:snap-none"
      >
        {dummyCategories.map((cat) => (
          <div
            key={cat.id}
            className="md:min-w-[85%] min-w-[80%] sm:min-w-0 flex-shrink-0 sm:flex-shrink snap-center"
          >
            <CategoryBox data={cat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCategorySection;

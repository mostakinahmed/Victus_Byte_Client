import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const dummyCategories = [
  {
    id: 1,
    title: "Computer Accessories",
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
        name: "EarBuds",
        img: "https://www.startech.com.bd/image/cache/catalog/earbuds/oneplus/nord-buds-3-pro/nord-buds-3%20pro-01-500x500.webp",
      },
      {
        name: "Power Bank",
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
  {
    id: 5,
    title: "Gaming Zone",
    items: [
      {
        name: "Gaming Mouse",
        img: "https://www.startech.com.bd/image/cache/catalog/graphics-card/msi/gt-730/gt-730-01-500x500.webp",
      },
      {
        name: "Keyboard",
        img: "https://www.startech.com.bd/image/cache/catalog/motherboard/gigabyte/b450m-k/b450m-k-01-500x500.webp",
      },
      {
        name: "Headset",
        img: "https://www.startech.com.bd/image/cache/catalog/power-supply/t-wolf/atx-350/atx-350w-04-500x500.webp",
      },
      {
        name: "Chair",
        img: "https://www.startech.com.bd/image/cache/catalog/component/ram/team/delta-8gb/8gb-500x500.jpg",
      },
    ],
  },
];

const CategoryBox = ({ data }) => {
  return (
    <div className="bg-white md:p-4 p-2 border border-gray-100 h-full hover:shadow-lg transition-all duration-300 rounded-sm">
      <h3 className="text-gray-700 font-semibold mb-4 text-[16px] truncate border-b pb-2">
        {data.title}
      </h3>

      <div className="grid grid-cols-2 md:gap-3 gap-2">
        {data.items.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className="flex text-center flex-col items-center cursor-pointer group/item"
          >
            <Link to={`/${item.name.toLowerCase()}`} className="w-full">
              <div className="bg-gray-100 md:p-4 p-5  mb-1 rounded w-full aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="object-contain transition-transform duration-500 group-hover/item:scale-110"
                />
              </div>
              <span className="text-[12px] md:text-[13px] text-center text-gray-600 hover:text-blue-600 mt-1 leading-tight block truncate font-medium">
                {item.name}
              </span>
            </Link>
          </div>
        ))}
      </div>

      <Link to={`/section/${data.title.toLowerCase()}`}>
        <button className="group mt-4 relative flex items-center gap-1 text-blue-600 text-xs font-bold transition-all duration-300 hover:text-slate-900">
          <span className="relative">
            See More
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fe741d] transition-all duration-300 group-hover:w-full group-hover:bg-slate-900"></span>
          </span>
          <FiChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Link>
    </div>
  );
};

const MultiCategorySection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      const scrollTo =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-[1400px] font-sans mx-auto mt-4 md:px-4 px-2 relative group/main">
      {/* --- NAVIGATION BUTTONS (DESKTOP ONLY) --- */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-2 top-1/2 -translate-y-1/2 z-40 bg-white shadow-xl p-3 rounded-full border border-gray-100 hidden group-hover/main:md:flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* --- HORIZONTAL SINGLE ROW SCROLLER --- */}
      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-auto gap-4 pb-2 no-scrollbar snap-x snap-mandatory"
      >
        {dummyCategories.map((cat, index) => (
          <div
            key={index}
            className="xl:w-[24.2%] lg:w-[32%] md:w-[45%] w-[85%] flex-shrink-0 snap-center"
          >
            <CategoryBox data={cat} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute -right-2 top-1/2 -translate-y-1/2 z-40 bg-white shadow-xl p-3 rounded-full border border-gray-100 hidden group-hover/main:md:flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
      >
        <FiChevronRight size={20} />
      </button>

      {/* --- CSS FOR HIDING SCROLLBAR --- */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
};

export default MultiCategorySection;

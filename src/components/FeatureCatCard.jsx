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
    <div className="bg-white p-4 border border-slate-200/80 h-full hover:shadow-md transition-all duration-300 rounded flex flex-col justify-between">
      <div>
        <h3 className="text-slate-800 font-bold mb-4 text-base tracking-tight truncate border-b border-slate-100 pb-2.5">
          {data.title}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {data.items.slice(0, 4).map((item, idx) => {
            const itemPath = `/${item.name.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <div key={idx} className="group/item min-w-0">
                <Link to={itemPath} className="block w-full">
                  <div className="bg-slate-50 border border-slate-100 p-3 mb-1.5 rounded-lg w-full aspect-square flex items-center justify-center overflow-hidden transition-colors group-hover/item:border-orange-100 group-hover/item:bg-orange-50/10">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover/item:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] md:text-xs text-slate-600 transition-colors group-hover/item:text-[#fe741d] leading-tight block truncate font-medium">
                    {item.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-50">
        <Link to={`/section/${data.title.toLowerCase()}`} className="inline-block">
          <button className="group relative flex items-center gap-1.5 text-[#fe741d] text-xs font-bold transition-all duration-300">
            <span className="relative">
              See More Collection
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fe741d] transition-all duration-300 group-hover:w-full"></span>
            </span>
            <FiChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

const MultiCategorySection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Adjusted scroll calculation to step cleanly by individual card bounds
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      const scrollTo =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-[1400px] font-sans mx-auto mt-6 md:px-4 px-2 relative group/main w-full">
      
      {/* --- SLIDER BUTTON (LEFT) --- */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll Left"
        className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-30 bg-white shadow-md border border-slate-200/80 w-10 h-10 rounded-full hidden group-hover/main:md:flex items-center justify-center text-slate-600 hover:text-[#fe741d] hover:border-[#fe741d] transition-all duration-200"
      >
        <FiChevronLeft size={18} strokeWidth={2.5} />
      </button>

      {/* --- SCROLLER ROW LAYER --- */}
      {/* Note: Kept snap-x but changed children items to snap-start */}
      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-auto gap-4 pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {dummyCategories.map((cat, index) => (
          <div
            key={cat.id || index}
            className="xl:w-[23%] lg:w-[22.8%] md:w-[46%] sm:w-[62%] w-[78%] flex-shrink-0 snap-start"
          >
            <CategoryBox data={cat} />
          </div>
        ))}
      </div>

      {/* --- SLIDER BUTTON (RIGHT) --- */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll Right"
        className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-30 bg-white shadow-md border border-slate-200/80 w-10 h-10 rounded-full hidden group-hover/main:md:flex items-center justify-center text-slate-600 hover:text-[#fe741d] hover:border-[#fe741d] transition-all duration-200"
      >
        <FiChevronRight size={18} strokeWidth={2.5} />
      </button>

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
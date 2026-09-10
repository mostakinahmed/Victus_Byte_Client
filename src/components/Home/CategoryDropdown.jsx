import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiGrid,
  FiArrowRight,
  FiHome,
  FiBox,
  FiX,
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";

const CategoryDropdown = () => {
  const { categoryData, productData } = useContext(DataContext);

  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const [catList, setCatList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ============================================================
  // GET UNIQUE CATEGORIES
  // ============================================================
  useEffect(() => {
    if (productData?.length && categoryData?.length) {
      const formattedData = productData
        .map((product) => {
          const category = categoryData.find(
            (cat) => cat.catID === product.category,
          );

          return category
            ? {
                name: category.catName,
                icon: category.catIcon,
              }
            : null;
        })
        .filter(Boolean);

      // Remove duplicate categories
      const uniqueCategories = Array.from(
        new Map(formattedData.map((item) => [item.name, item])).values(),
      );

      setCatList(uniqueCategories);
    }
  }, [productData, categoryData]);

  // ============================================================
  // FILTER CATEGORIES
  // ============================================================
  const filteredCategories = catList.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  // ============================================================
  // OPEN MODAL
  // ============================================================
  const openModal = () => {
    setShouldRender(true);

    // Allow initial closed state to render first
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  };

  // ============================================================
  // CLOSE MODAL
  // ============================================================
  const closeModal = () => {
    setIsOpen(false);

    // Wait for closing animation
    setTimeout(() => {
      setShouldRender(false);
      setSearchQuery("");
    }, 300);
  };

  return (
    <>
      {/* ========================================================
          NAVBAR
      ======================================================== */}
      <div className="flex items-center">
        {/* HOME */}
        {/* <Link
          to="/"
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            -ml-3
            text-brand
            hover:text-brand
            font-bold
            text-[14px]
            transition-colors
            uppercase
            tracking-wide
          "
        >
          <FiHome className="text-lg text-brand" />
          Home
        </Link> */}

        {/* ALL CATEGORIES */}
        <button
          type="button"
          onClick={openModal}
          aria-label="Open all categories"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="
            flex
            items-center
            gap-2
            py-2
            rounded-lg
           
            hover:text-brand
            transition-all
            duration-200
            font-bold
            
            tracking-wide
            cursor-pointer
           
          "
        >
          <FiGrid className="text-[15px] text-brand" />

          <span className="flex items-center gap-2  hover:text-brand font-medium text-sm  tracking-wider transition-all">
            All Categories
          </span>
        </button>
      </div>

      {/* ========================================================
          MODAL
      ======================================================== */}
      {shouldRender && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            p-3
            sm:p-6
          "
          role="dialog"
          aria-modal="true"
          aria-label="Product categories"
        >
          {/* ====================================================
              BACKDROP
          ==================================================== */}
          <button
            type="button"
            aria-label="Close categories"
            onClick={closeModal}
            className={`
              absolute
              inset-0
              w-full
              h-full
              bg-slate-950/30
              cursor-default

              transition-all
              duration-300
              ease-out

              ${
                isOpen
                  ? "opacity-100 backdrop-blur-[4px]"
                  : "opacity-0 backdrop-blur-0"
              }
            `}
          />

          {/* ====================================================
              MODAL CONTAINER
          ==================================================== */}
          <div
            className={`
              relative
              z-10
              flex
              flex-col
              w-full
              max-w-5xl
              max-h-[90vh]
              overflow-hidden

              bg-white       
              rounded-xl
              shadow-[0_30px_90px_rgba(15,23,42,0.22)]

              transform
              transition-all
              duration-300
              ease-out

              ${
                isOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-4"
              }
            `}
          >
            {/* ==================================================
                GLASSY GRADIENT HEADER
            ================================================== */}
            <div
              className="
                relative
                flex
                items-center
                justify-between
                px-5
                py-3
                flex-shrink-0
                overflow-hidden

                bg-gradient-to-r
                from-brand/95
                via-brand/95
                to-brand/95

           
                shadow-lg
                shadow-blue-900/10

                backdrop-blur-lg
              "
            >
              {/* GLASS LIGHT EFFECT */}
              <div
                className="
                  absolute
                  inset-0
                  bg-white/10
                  backdrop-blur-xl
                  pointer-events-none
                "
              />

              {/* LEFT GLOW */}
              <div
                className="
                  absolute
                  -left-10
                  -top-14
                  w-36
                  h-36
                  rounded-full
                  bg-white/15
                  blur-2xl
                  pointer-events-none
                "
              />

              {/* RIGHT GLOW */}
              <div
                className="
                  absolute
                  -right-10
                  -bottom-16
                  w-40
                  h-40
                  rounded-full
                  bg-indigo-300/20
                  blur-3xl
                  pointer-events-none
                "
              />

              {/* TOP GLASS LINE */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-px
                  bg-white/30
                  pointer-events-none
                "
              />

              {/* ==================================================
                  TITLE
              ================================================== */}
              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  gap-3
                "
              >
            

                {/* HEADING */}
                <div className="flex flex-col">
                  <h2
                    className="
                      text-base
                      sm:text-lg
                      font-extrabold
                      text-white
                      leading-tight
                      tracking-tight
                    "
                  >
                    Shop by <span className="text-blue-100">Category</span>
                  </h2>

                  {/* SUBTITLE */}
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="
                        w-5
                        h-[2px]
                        bg-white/70
                        rounded-full
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        sm:text-[10px]
                        font-semibold
                        text-white/70
                        uppercase
                        tracking-[0.16em]
                      "
                    >
                      Explore Collection
                    </span>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  CLOSE BUTTON
              ================================================== */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close categories"
                className="
                  relative
                  z-10
                  group

                  flex
                  items-center
                  justify-center

                  w-9
                  h-9

                  rounded-lg

                  bg-white
                  border
          
                  text-black
                  backdrop-blur-md
                  hover:bg-white
                  hover:text-brand

                  hover:shadow-lg
                  hover:shadow-blue-900/20

                  transition-all
                  duration-200
                "
              >
                <FiX
                  size={18}
                  className="
                    group-hover:rotate-90
                    transition-transform
                    duration-200
                  "
                />
              </button>
            </div>

            {/* ==================================================
                CATEGORY CONTENT
            ================================================== */}
            <div
              className="
                flex-1
                overflow-y-auto
                px-3
                py-3
                bg-white
              "
            >
              {/* ==================================================
                  CATEGORY GRID
              ================================================== */}
              {filteredCategories.length > 0 ? (
                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-3
                    
                  "
                >
                  {filteredCategories.map((category, index) => {
                    const categoryUrl = category.name
                      .toLowerCase()
                      .trim()
                      .replace(/\s+/g, "-");

                    return (
                      <Link
                        key={category.name || index}
                        to={`/${categoryUrl}`}
                        onClick={closeModal}
                        className="
                            group
                            relative
                            flex
                            items-center
                            gap-4
                           
                            p-1

                            min-h-[100px]

                            rounded

                            bg-white
                            border
                            border-slate-300

                            hover:border-blue-300
                            hover:bg-blue-50/40

                            hover:shadow-[0_8px_25px_rgba(25,118,210,0.10)]

                            transition-all
                            duration-200
                          "
                      >
                        {/* CATEGORY IMAGE */}
                        <div
                          className="
                              w-[76px]
                              h-[76px]

                              sm:w-[110px]
                              sm:h-[110px]

                              flex-shrink-0

                              rounded

                              border
                              border-slate-200

                              flex
                              items-center
                              justify-center

                              p-1

                              overflow-hidden

                              group-hover:bg-white
                              group-hover:border-blue-100

                              transition-all
                            "
                        >
                          {category.icon ? (
                            <img
                              src={category.icon}
                              alt={category.name}
                              loading="lazy"
                              className="
                                  w-full
                                  h-full
                                  object-contain

                                  group-hover:scale-110

                                  transition-transform
                                  duration-300
                                "
                            />
                          ) : (
                            <FiBox
                              size={30}
                              className="
                                  text-slate-300
                                  group-hover:text-[#1976d2]
                                  transition-colors
                                "
                            />
                          )}
                        </div>

                        {/* CATEGORY DETAILS */}
                        <div
                          className="
                              min-w-0
                              flex-1
                            "
                        >
                          <h3
                            className="
                                
                                font-medium
                                text-slate-800

                                group-hover:text-[#1976d2]

                                transition-colors

                                truncate
                              "
                          >
                            {category.name}
                          </h3>

                          <p
                            className="
                                mt-1
                                text-[10px]
                                sm:text-[11px]

                                text-slate-400

                                uppercase
                                tracking-wider
                              "
                          >
                            Explore collection
                          </p>
                        </div>

                        {/* ARROW */}
                        <div
                          className="
                              flex
                              items-center
                              justify-center

                              w-8
                              h-8

                              flex-shrink-0

                              rounded-full

                              bg-slate-50
                              text-slate-300

                              group-hover:bg-[#1976d2]
                              group-hover:text-white

                              transition-all
                              duration-200
                            "
                        >
                          <FiChevronRight size={16} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                /* ==================================================
                   EMPTY STATE
                ================================================== */
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center

                    py-16

                    text-center
                  "
                >
                  <div
                    className="
                      w-16
                      h-16

                      rounded-2xl

                      bg-slate-50
                      border
                      border-slate-200

                      flex
                      items-center
                      justify-center

                      mb-4
                    "
                  >
                    <FiSearch size={25} className="text-slate-300" />
                  </div>

                  <h3
                    className="
                      text-sm
                      font-bold
                      text-slate-700
                    "
                  >
                    No categories found
                  </h3>

                  <p
                    className="
                      text-xs
                      text-slate-400
                      mt-1
                      max-w-xs
                    "
                  >
                    Try a different search term or browse all available
                    categories.
                  </p>

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="
                        mt-4
                        text-xs
                        font-bold
                        text-[#1976d2]
                        hover:underline
                      "
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ==================================================
                FOOTER
            ================================================== */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-4

                px-5
                sm:px-7

                py-3.5
                sm:py-4

                bg-slate-50

                border-t
                border-slate-200

                flex-shrink-0
              "
            >
              {/* CATEGORY COUNT */}
              <div
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-[#1976d2]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    text-slate-400
                    uppercase
                    tracking-widest
                  "
                >
                  {catList.length} Categories Available
                </span>
              </div>

              {/* BROWSE ALL */}
              <Link
                to="/shop"
                onClick={closeModal}
                className="
                  ml-auto

                  flex
                  items-center
                  justify-center
                  gap-2

                  px-5
                  py-2.5

                  rounded-xl

                  bg-black

                  hover:bg-brand

                  text-white

                  text-[11px]
                  font-extrabold

                  uppercase
                  tracking-wider

                  shadow-sm
                  hover:shadow-md

                  transition-all
                "
              >
                Browse All Products
                <FiArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryDropdown;

import React, { useContext, useMemo, useState, useEffect } from "react";
import { DataContext } from "../components/Context Api/UserContext.jsx";
import { FiSearch, FiX, FiShoppingBag, FiPlus } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const Comparison = () => {
  const { productData } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ============================================================
  // TWO PRODUCT SLOTS
  // ============================================================
  const [selectedProducts, setSelectedProducts] = useState([null, null]);

  // Search query for each product column
  const [searchQueries, setSearchQueries] = useState(["", ""]);

  // Which search dropdown is currently open
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ============================================================
  // AUTO-FILL FROM "ADD TO COMPARE" STATE
  // ============================================================
  useEffect(() => {
    const passedId = location.state?.compareProductId;

    if (passedId && productData && Array.isArray(productData)) {
      // Find the product matching the passed ID
      const matchedProduct = productData.find((p) => p.pID === passedId);

      if (matchedProduct) {
        setSelectedProducts((prev) => [matchedProduct, prev[1]]);
      }
    }
  }, [location.state, productData]);

  // ============================================================
  // SELECT PRODUCT
  // ============================================================
  const handleSelectProduct = (index, product) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = product;
    setSelectedProducts(updatedProducts);

    // Clear search after selection
    const updatedQueries = [...searchQueries];
    updatedQueries[index] = "";
    setSearchQueries(updatedQueries);
    setActiveDropdown(null);
  };

  // ============================================================
  // REMOVE PRODUCT
  // ============================================================
  const handleRemoveProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = null;
    setSelectedProducts(updatedProducts);

    const updatedQueries = [...searchQueries];
    updatedQueries[index] = "";
    setSearchQueries(updatedQueries);
    setActiveDropdown(null);
  };

  // ============================================================
  // SEARCH PRODUCT
  // ============================================================
  const getFilteredProducts = (index) => {
    const query = searchQueries[index]?.trim().toLowerCase();

    if (!query) return [];
    if (!productData || !Array.isArray(productData)) {
      return [];
    }

    return productData.filter((product) => {
      if (!product?.name) return false;

      const matchesName = product.name.toLowerCase().includes(query);

      // Don't allow the same product in both columns
      const alreadySelectedInOtherColumn = selectedProducts.some(
        (selectedProduct, selectedIndex) =>
          selectedIndex !== index && selectedProduct?.pID === product.pID,
      );

      return matchesName && !alreadySelectedInOtherColumn;
    });
  };

  const allSpecifications = useMemo(() => {
    const categoryMap = new Map();

    selectedProducts.filter(Boolean).forEach((product) => {
      Object.entries(product.specifications || {}).forEach(
        ([category, specifications]) => {
          if (!categoryMap.has(category)) {
            categoryMap.set(category, new Set());
          }

          if (Array.isArray(specifications)) {
            specifications.forEach((spec) => {
              if (spec?.key) {
                categoryMap.get(category).add(spec.key);
              }
            });
          }
        },
      );
    });

    return Array.from(categoryMap.entries()).map(([category, keys]) => ({
      category,
      keys: Array.from(keys),
    }));
  }, [selectedProducts]);

  // ============================================================
  // GET SPECIFICATION VALUE
  // ============================================================
  const getSpecificationValue = (product, specKey) => {
    if (!product) {
      return "-";
    }

    const specifications = product.specifications || {};

    for (const specs of Object.values(specifications)) {
      if (!Array.isArray(specs)) continue;

      const found = specs.find((spec) => spec?.key === specKey);

      if (found) {
        return found.value || "-";
      }
    }

    return "-";
  };

  // ============================================================
  // HANDLE SEARCH CHANGE
  // ============================================================
  const handleSearchChange = (index, value) => {
    const updatedQueries = [...searchQueries];
    updatedQueries[index] = value;
    setSearchQueries(updatedQueries);
    setActiveDropdown(index);
  };

  // ============================================================
  // PRODUCT URL
  // ============================================================
  const shopNow = (product) => {
    if (!product) return "#";

    const productName = product.name?.replace(/\s+/g, "-").toLowerCase();
    navigate(`/${product.category}/${productName}`);
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="w-full">
      {/* ============================================================
        DESKTOP VERSION
    ============================================================ */}
      <div className="hidden max-w-[1400px] mx-auto px-2 md:px-4 -mt-10 md:block w-full overflow-x-auto">
        <table className="w-full min-w-[940px] border-collapse">
          <thead>
            <tr>
              {/* LEFT INFORMATION COLUMN */}
              <th
                className="
                w-[260px]
                p-6
                border-b border-r border-slate-200
                bg-slate-50/70
                align-top
                text-left
              "
              >
                <div className="sticky top-0">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Compare Products
                  </h3>

                  <p className="text-sm text-slate-500 font-normal leading-relaxed">
                    Select two products to compare their specifications,
                    features, and differences.
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-300">
                    <span className="text-[13px] font-medium text-black/60">
                      Selected
                    </span>

                    <span className="text-[13px] font-black text-[#F66107]">
                      {selectedProducts.filter(Boolean).length}/2
                    </span>
                  </div>
                </div>
              </th>

              {/* TWO PRODUCT COLUMNS */}
              {selectedProducts.map((product, index) => {
                const filteredProducts = getFilteredProducts(index);

                return (
                  <th
                    key={index}
                    className="
                    w-[340px]
                    p-5
                    border-b border-r border-slate-200
                    align-top
                    relative
                    font-normal
                  "
                  >
                    {/* SEARCH */}
                    <div className="relative mb-4">
                      <FiSearch
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />

                      <input
                        type="text"
                        placeholder="Search product..."
                        value={searchQueries[index]}
                        onFocus={() => {
                          if (searchQueries[index].trim()) {
                            setActiveDropdown(index);
                          }
                        }}
                        onChange={(e) =>
                          handleSearchChange(index, e.target.value)
                        }
                        className="
                        w-full h-10 pl-9 pr-9 rounded-full
                        border border-slate-300
                        bg-white
                        placeholder:font-normal
                        font-medium text-slate-700
                        placeholder:text-slate-400
                        outline-none transition
                        focus:border-[#F66107]
                        focus:ring-2 focus:ring-[#F66107]/10
                      "
                      />

                      {searchQueries[index] && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...searchQueries];
                            updated[index] = "";
                            setSearchQueries(updated);
                            setActiveDropdown(null);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          <FiX size={14} />
                        </button>
                      )}

                      {/* SEARCH DROPDOWN */}
                      {activeDropdown === index &&
                        searchQueries[index].trim() !== "" && (
                          <div className="absolute top-12 left-0 w-full bg-white border border-slate-300 rounded-xl shadow-xl overflow-hidden z-50">
                            {filteredProducts.length > 0 ? (
                              <div className="max-h-60 overflow-y-auto">
                                {filteredProducts.map((p) => (
                                  <button
                                    key={p.pID}
                                    type="button"
                                    onClick={() =>
                                      handleSelectProduct(index, p)
                                    }
                                    className="
                                    w-full flex items-center gap-3 p-3
                                    text-left
                                    hover:bg-[#FDF2EC]
                                    border-b border-slate-100
                                    last:border-0
                                    transition cursor-pointer
                                  "
                                  >
                                    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                      <img
                                        src={p.images?.[0]}
                                        alt={p.name}
                                        className="w-full h-full object-contain p-1"
                                      />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <p className="text-sm font-bold text-slate-800 truncate">
                                        {p.name}
                                      </p>

                                      <p className="text-[11px] text-slate-500 mt-1">
                                        ৳{p.price?.selling || "N/A"}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="p-6 text-center">
                                <FiSearch
                                  size={22}
                                  className="mx-auto mb-2 text-slate-300"
                                />

                                <p className="text-xs text-slate-400">
                                  No products found
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                    </div>

                    {/* SELECTED PRODUCT */}
                    {product ? (
                      <div className="flex flex-col min-h-[320px]">
                        <div className="relative h-45 flex items-center justify-center p-2 mb-3 -mt-3">
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="max-h-full max-w-[200px] object-contain mix-blend-multiply"
                          />
                        </div>

                        <h4 className="font-medium text-slate-900 line-clamp-2 min-h-[30px]">
                          {product.name}
                        </h4>

                        {product.brandName && (
                          <p className="font-bold text-brand mb-2">
                            {product.brandName}
                          </p>
                        )}

                        <div className="mb-4">
                          <span className="text-xl font-black text-slate-900">
                            ৳{product.price?.selling || "N/A"}
                          </span>

                          {product.price?.regular && (
                            <span className="text-xs text-slate-400 line-through ml-2">
                              ৳{product.price.regular}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2 md:gap-10 mt-auto md:mx-10">
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(index)}
                            className="
                            flex-1 h-9 px-3 rounded-full
                            border border-slate-300
                            text-slate-700 text-sm font-bold
                            hover:bg-slate-100
                            transition cursor-pointer
                          "
                          >
                            Remove
                          </button>

                          <button
                            type="button"
                            onClick={() => shopNow(product)}
                            className="
                            flex-1 h-9 px-3 rounded-full
                            text-white text-sm font-bold
                            flex items-center justify-center gap-1
                            shadow-sm transition cursor-pointer
                          "
                            style={{ backgroundColor: "#F66107" }}
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="min-h-[250px] flex flex-col items-center justify-center">
                        <img
                          className="w-30 h-30 opacity-20"
                          src="https://img.magnific.com/premium-vector/picture-icon-symbol-mark-filled-style_1223784-5604.jpg?semt=ais_hybrid&w=740&q=80"
                          alt=""
                        />
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* DESKTOP SPECIFICATIONS */}
          <tbody>
            {allSpecifications.length > 0 &&
              allSpecifications.map(({ category, keys }) => (
                <React.Fragment key={category}>
                  <tr>
                    <td
                      colSpan={3}
                      className="
                      px-5 py-2
                      bg-slate-200
                      border-b border-slate-200
                      text-lg font-extrabold
                      text-brand
                    "
                    >
                      {category}
                    </td>
                  </tr>

                  {keys.map((key) => (
                    <tr
                      key={`${category}-${key}`}
                      className="border-b border-slate-200 hover:bg-slate-50/60 transition"
                    >
                      <td className="w-[260px] px-4 py-1 border-r border-slate-200">
                        <span className="font-semibold text-slate-900">
                          {key}
                        </span>
                      </td>

                      {selectedProducts.map((product, index) => {
                        const value = getSpecificationValue(product, key);

                        return (
                          <td
                            key={index}
                            className="
                            w-[340px]
                            px-4 py-3
                            border-r border-slate-200
                            leading-relaxed
                          "
                          >
                            {product ? (
                              <span
                                className={
                                  value === "-"
                                    ? "text-slate-300"
                                    : "text-slate-800 font-medium"
                                }
                              >
                                {value}
                              </span>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>

      {/* ============================================================
        MOBILE VERSION
    ============================================================ */}
      <div className="block md:hidden w-full  bg-white">
        {/* MOBILE HEADER */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-black">
                Compare Products
              </h2>
            </div>

            <div className="px-3 rounded-lg bg-orange-50 border border-[#F66107]/20">
              <span className="text-[12px] font-bold text-[#F66107]">
                {selectedProducts.filter(Boolean).length}/2
              </span>
            </div>
          </div>
        </div>

        {/* ==========================================================
          TWO PRODUCTS IN ONE ROW
      ========================================================== */}
        <div className="px-2">
          <div className="grid grid-cols-2 gap-2">
            {selectedProducts.map((product, index) => {
              const filteredProducts = getFilteredProducts(index);

              return (
                <div
                  key={index}
                  className="
                  min-w-0
                  rounded-xl
                  border border-slate-200
                  bg-white
                  overflow-visible
                "
                >
                  {/* SEARCH */}
                  <div className="relative p-2">
                    <FiSearch
                      size={12}
                      className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-slate-400
                      pointer-events-none
                    "
                    />

                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQueries[index]}
                      onFocus={() => {
                        if (searchQueries[index].trim()) {
                          setActiveDropdown(index);
                        }
                      }}
                      onChange={(e) =>
                        handleSearchChange(index, e.target.value)
                      }
                      className="
                      w-full h-8
                      pl-7 pr-6
                      rounded-lg
                      border border-slate-300/70
                      bg-slate-50
                      text-[10px]
                      font-medium
                      text-slate-700
                      placeholder:text-slate-400
                      outline-none
                      transition
                      focus:border-[#F66107]
                      focus:ring-1
                      focus:ring-[#F66107]/10
                    "
                    />

                    {searchQueries[index] && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...searchQueries];

                          updated[index] = "";

                          setSearchQueries(updated);
                          setActiveDropdown(null);
                        }}
                        className="
                        absolute right-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                      >
                        <FiX size={11} />
                      </button>
                    )}

                    {/* MOBILE DROPDOWN */}
                    {activeDropdown === index &&
                      searchQueries[index].trim() !== "" && (
                        <div
                          className="
                          absolute
                          top-11
                          left-2
                          right-2
                          bg-white
                          border border-slate-200
                          rounded-lg
                          shadow-2xl
                          overflow-hidden
                          z-[100]
                        "
                        >
                          {filteredProducts.length > 0 ? (
                            <div className="max-h-48 overflow-y-auto">
                              {filteredProducts.map((p) => (
                                <button
                                  key={p.pID}
                                  type="button"
                                  onClick={() => handleSelectProduct(index, p)}
                                  className="
                                  w-full
                                  flex
                                  items-center
                                  gap-2
                                  p-2
                                  text-left
                                  border-b
                                  border-slate-100
                                  last:border-0
                                  hover:bg-orange-50
                                  cursor-pointer
                                "
                                >
                                  <div className="w-8 h-8 shrink-0 rounded-md bg-slate-50 flex items-center justify-center">
                                    <img
                                      src={p.images?.[0]}
                                      alt={p.name}
                                      className="w-full h-full object-contain p-1"
                                    />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-medium text-slate-800 truncate">
                                      {p.name}
                                    </p>

                                    <p className="text-[9px] text-slate-700 mt-0.5">
                                      ৳{p.price?.selling || "N/A"}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 text-center">
                              <FiSearch
                                size={18}
                                className="mx-auto mb-1 text-slate-300"
                              />

                              <p className="text-[9px] text-slate-400">
                                No products found
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  {/* ==================================================
                    PRODUCT
                ================================================== */}
                  {product ? (
                    <div className="px-2 pb-3">
                      {/* IMAGE */}
                      <div
                        className="
                        h-32
                        rounded-lg
                        bg-slate-50
                        flex
                        items-center
                        justify-center
                        mb-2
                        overflow-hidden
                      "
                      >
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="
                          max-h-full
                          max-w-full
                          object-contain
                          p-2
                          mix-blend-multiply
                        "
                        />
                      </div>

                      {/* NAME */}
                      <h4
                        className="
                        text-[11px]
                        leading-tight
                        font-semibold
                        text-slate-900
                        line-clamp-2
                        min-h-[25px]
                      "
                      >
                        {product.name}
                      </h4>

                      {/* BRAND */}
                      {product.brandName && (
                        <p className="text-[10px] font-bold text-brand mt-1 truncate">
                          {product.brandName}
                        </p>
                      )}

                      {/* PRICE */}
                      <div className="mt-2 mb-3">
                        <span className="text-sm font-extrabold text-slate-900">
                          ৳{product.price?.selling || "N/A"}
                        </span>

                        {product.price?.regular && (
                          <span className="block text-[8px] text-slate-400 line-through">
                            ৳{product.price.regular}
                          </span>
                        )}
                      </div>

                      {/* BUTTONS */}
                      <div className="flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(index)}
                          className="
                          w-full
                          h-7
                          rounded-full
                          border border-slate-300
                          text-[11px]
                          font-bold
                          text-slate-700
                          hover:bg-slate-100
                          transition
                          cursor-pointer
                        "
                        >
                          Remove
                        </button>

                        <button
                          type="button"
                          onClick={() => shopNow(product)}
                          className="
                          w-full
                          h-7
                          rounded-full
                          text-white
                          text-[11px]
                          font-bold
                          transition
                          cursor-pointer
                        "
                          style={{
                            backgroundColor: "#F66107",
                          }}
                        >
                          Shop Now
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* EMPTY */
                    <div className="h-48 flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src="https://img.magnific.com/premium-vector/picture-icon-symbol-mark-filled-style_1223784-5604.jpg?semt=ais_hybrid&w=740&q=80"
                          alt=""
                          className="w-14 h-14 mx-auto opacity-20"
                        />

                        <p className="text-[9px] text-slate-300 mt-2">
                          Select product
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
          MOBILE SPECIFICATIONS
      ============================================================ */}
        {allSpecifications.length > 0 && (
          <div className="mt-5">
            {allSpecifications.map(({ category, keys }) => (
              <div key={category}>
                {/* Category Heading */}
                <div className="px-4 py-2.5 bg-black/10 border-y border-slate-200">
                  <h3 className="text-sm font-black text-brand">{category}</h3>
                </div>

                {keys.map((key) => {
                  const value1 = selectedProducts[0]
                    ? getSpecificationValue(selectedProducts[0], key)
                    : "-";

                  const value2 = selectedProducts[1]
                    ? getSpecificationValue(selectedProducts[1], key)
                    : "-";

                  return (
                    <div
                      key={`${category}-${key}`}
                      className="border-b border-slate-200"
                    >
                      {/* KEY HEADING */}
                      <div className="px-3 py-2 bg-slate-100 text-center border-b border-slate-100">
                        <span className="text-sm font-semibold tracking-wide text-black/90">
                          {key}
                        </span>
                      </div>

                      {/* TWO VALUES */}
                      <div className="grid grid-cols-2">
                        {/* Product 1 */}
                        <div className="px-3 py-2 border-r border-slate-200">
                          <span
                            className={`text-sm break-words ${
                              value1 === "-" ? "text-slate-300" : "text-black"
                            }`}
                          >
                            {value1}
                          </span>
                        </div>

                        {/* Product 2 */}
                        <div className="px-3 py-2">
                          <span
                            className={`text-sm break-words ${
                              value2 === "-" ? "text-slate-300" : "text-black"
                            }`}
                          >
                            {value2}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* NO SPECIFICATIONS */}
        {allSpecifications.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-xs text-slate-400">
              No specifications available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparison;

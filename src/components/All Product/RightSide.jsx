import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../Context Api/UserContext";

const RightSide = ({ filterData }) => {
  const { categoryData, productData } = useContext(DataContext);
  const { cat: urlParam } = useParams();

  const [cat, setCat] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [catName, setCatName] = useState("Category");

  // 1. FIXED: Handle hyphenated URL parameters
  useEffect(() => {
    if (categoryData && urlParam) {
      // Convert "robotics-kits" back to "robotics kits" for comparison
      const normalizedUrlParam = urlParam.replace(/-/g, " ").toLowerCase();

      const foundCat = categoryData.find(
        (c) => c.catName.toLowerCase() === normalizedUrlParam,
      );

      // Set the specific category ID if found, otherwise use the slug
      setCat(foundCat ? foundCat.catID : urlParam);
    }
  }, [categoryData, urlParam]);

  // 2. Update category name for the header
  useEffect(() => {
    if (cat && categoryData) {
      const result = categoryData.find((item) => item.catID === cat);
      // If result exists, use its proper name, otherwise format the slug
      setCatName(result ? result.catName : cat.replace(/-/g, " "));
    }
  }, [cat, categoryData]);

  // 3. Filter products logic (remains mostly same, but ensures it uses 'cat' ID)
  useEffect(() => {
    if (!cat) {
      setFilteredProducts(productData);
      return;
    }

    let filtered = [];
    if (cat === "new-arrival") {
      filtered = productData.filter((product) => product.status?.isNewArrival);
    } else if (cat === "featured-products") {
      filtered = productData.filter((product) => product.status?.isFeatured);
    } else {
      // Filtering by the Category ID found in step 1
      filtered = productData.filter((product) => product.category === cat);
    }
    setFilteredProducts(filtered);
  }, [cat, productData]);

  const productsToDisplay =
    filterData && filterData.length > 0 ? filterData : filteredProducts;

  return (
    <section className="w-full">
      <h2 className="text-md bg-white text-center p-1.5 rounded shadow font-semibold uppercase mb-2">
        {catName}
      </h2>

      <div className="grid gap-2 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <Link
              key={product.pID}
              to={`/${product.category.replace(/\s+/g, "-").toLowerCase()}/${product.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            >
              <ProductCard data={product} />
            </Link>
          ))
        ) : (
          <div className="text-center col-span-full py-10">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RightSide;

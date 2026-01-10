import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../Context Api/UserContext";

const RightSide = ({ filterData }) => {
  const { categoryData, productData } = useContext(DataContext);
  const { cat: urlParam } = useParams();

  const [cat, setCat] = useState(urlParam); // Store category in state
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [catName, setCatName] = useState("Category");

  // Update `cat` when category data or URL params change
  useEffect(() => {
    if (categoryData && urlParam) {
      const foundCat = categoryData.find(
        (c) => c.catName.toLowerCase() === urlParam.toLowerCase()
      );
      setCat(foundCat ? foundCat.catID : urlParam); // Set category ID or raw URL param
    }
  }, [categoryData, urlParam]);

  // Update category name when `cat` changes
  useEffect(() => {
    if (cat) {
      const result = categoryData.find((item) => item.catID === cat);
      setCatName(result ? result.catName : cat); // Set category name
    }
  }, [cat, categoryData]);

  // Filter products based on category
  useEffect(() => {
    if (!cat) {
      setFilteredProducts(productData); // Show all products if no category
      return;
    }

    let filtered = [];
    if (cat === "new-arrival") {
      filtered = productData.filter((product) => product.status?.isNewArrival);
    } else if (cat === "featured-products") {
      filtered = productData.filter((product) => product.status?.isFeatured);
    } else {
      filtered = productData.filter((product) => product.category === cat);
    }
    setFilteredProducts(filtered);
  }, [cat, productData]);

  // Determine which data to display
  const productsToDisplay =
    filterData && filterData.length > 0 ? filterData : filteredProducts;

  return (
    <section className="w-full">
      <h2 className=" text-md bg-white text-center p-1.5 pl-1 rounded shadow font-semibold uppercase mb-4">
        {catName}
      </h2>

      <div className="grid gap-3 lg:grid-cols-4 xl:grid-cols-4 grid-cols-2 lg:gap-3">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <Link
              key={product.pID}
              to={`/${product.category}/${product.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`} // Replace spaces with hyphens in the URL
              aria-label={`View details for ${product.name}`}
            >
              <ProductCard data={product} />
            </Link>
          ))
        ) : (
          <div className="text-center col-span-full">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RightSide;

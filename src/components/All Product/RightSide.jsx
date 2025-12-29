import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Link, useParams } from "react-router-dom";
import { DataContext, UserContext } from "../Context Api/UserContext";

const RightSide = ({ filterData }) => {
  const { categoryData, productData } = useContext(DataContext);
  const { cat } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [catName, setCatName] = useState("cat Name");

  //filter catName to show dom
  useEffect(() => {
    if (cat) {
      const result = categoryData.find((item) => item.catID === cat);

      if (result && result.catName) {
        setCatName(result.catName);
      } else {
        setCatName(cat); // optional fallback
      }
    }
  }, [cat, categoryData]);

  useEffect(() => {
    // Filter products based on the category
    if (cat) {
      const filtered = productData.filter(
        (product) => product.category === cat
      );

      if (cat === "new-arrival") {
        const newArrivalProducts = productData.filter(
          (product) => product.status?.isNewArrival
        );
        setFilteredProducts(newArrivalProducts);
      } else if (cat === "featured-products") {
        const featuredProducts = productData.filter(
          (product) => product.status?.isFeatured
        );
        console.log(featuredProducts);

        setFilteredProducts(featuredProducts);
      }
    } else {
      setFilteredProducts(productData); // If no category, show all products
    }
  }, [cat, productData]);

  return (
    <section className="w-full ">
      <h2 className="md:text-lg bg-white text-center p-1.5 pl-1 rounded shadow font-semibold mb-4">
        {catName}
      </h2>

      {/* Check if there are filtered products */}
      {filterData === null || filterData.length === 0 ? (
        <div className="grid gap-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 lg:gap-3">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.category}/${product.pID}`}>
              <ProductCard data={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 lg:gap-3">
          {filterData.map((product) => (
            <Link to={`/product/${product.category}/${product.pID}`}>
              <ProductCard data={product} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default RightSide;

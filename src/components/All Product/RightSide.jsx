import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../Context Api/UserContext";
import axios from "axios";

const RightSide = ({ filterData }) => {
  const { categoryData, productData } = useContext(DataContext);
  const { cat: urlParam } = useParams();
  const navigate = useNavigate();

  const [cat, setCat] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [catName, setCatName] = useState("Category");
  const [isCheckingOrder, setIsCheckingOrder] = useState(false);

  // 1. Handle hyphenated URL parameters & identify Category ID
  useEffect(() => {
    if (categoryData && urlParam) {
      const normalizedUrlParam = urlParam.replace(/-/g, " ").toLowerCase();
      const foundCat = categoryData.find(
        (c) => c.catName.toLowerCase() === normalizedUrlParam,
      );
      // Set the specific category ID if found, otherwise use the slug as fallback
      setCat(foundCat ? foundCat.catID : urlParam);
    }
  }, [categoryData, urlParam]);

  // 2. Update the display name for the header
  useEffect(() => {
    if (cat && categoryData) {
      const result = categoryData.find((item) => item.catID === cat);
      setCatName(result ? result.catName : cat.replace(/-/g, " "));
    }
  }, [cat, categoryData]);

  // 3. MAIN LOGIC: Filter Products -> Fallback to Tracking -> Fallback to 404
  useEffect(() => {
    if (!cat || !productData) return;

    let filtered = [];
    if (cat === "new-arrival") {
      filtered = productData.filter((product) => product.status?.isNewArrival);
    } else if (cat === "featured-products") {
      filtered = productData.filter((product) => product.status?.isFeatured);
    } else {
      // Standard category filtering
      filtered = productData.filter((product) => product.category === cat);
    }

    // --- FALLBACK CHECK FOR SHORT URLS ---
    if (filtered.length === 0 && urlParam.length === 6) {
      const checkOrderRedirect = async () => {
        setIsCheckingOrder(true);
        try {
          // Check your backend API for a matching shortId
          const { data } = await axios.get(
            `https://api.victusbyte.com/order/${urlParam}`,
          );

          if (data && data.url) {
            // Success! Send the user to the track-order page
            window.location.replace(data.url);
            return;
          }
        } catch (err) {
          console.log("No matching tracking ID found in database.");
        } finally {
          setIsCheckingOrder(false);
        }
      };
      checkOrderRedirect();
    }

    setFilteredProducts(filtered);
  }, [cat, productData, urlParam]);

  const productsToDisplay =
    filterData && filterData.length > 0 ? filterData : filteredProducts;

  // Render a professional spinner while checking the backend
  if (isCheckingOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">
          Searching for products or order details...
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Header showing Category Name */}
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
          /* 4. NOT FOUND STATE: Shown only if product check and order check both fail */
          <div className="text-center col-span-full py-20 bg-white rounded shadow-sm border border-dashed border-gray-300">
            <div className="mb-4 text-5xl">📦</div>
            <h3 className="text-xl font-bold text-gray-800">
              Oops! Item Not Found
            </h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">
              We couldn't find any category or tracking ID matching "{urlParam}
              ".
            </p>
            <div className="flex gap-2 justify-center mt-6">
              <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-all"
              >
                Return Home
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RightSide;

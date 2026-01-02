import ProductCard from "../components/ProductCard";
import { DataContext } from "../components/Context Api/UserContext";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function SearchResult() {
  const { productData } = useContext(DataContext);
  const { keyword } = useParams();

  //searching
  const filtered = productData.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const desc = item.description?.toLowerCase() || "";

    const words = keyword.toLowerCase().trim().split(" ");
    return words.every((word) => name.includes(word) || desc.includes(word));
  });

  // inside component
  useEffect(() => {
    if (filtered.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No products found!",
        text: "Try a different keyword.",
        backdrop: `rgba(0,0,0,0.3)`,
        timer: 1000,
      });
    }
  }, [filtered]);

  return (
    <div className="max-w-[1400px] mt-[35px] lg:mt-[80px] mx-auto lg:px-4 px-2 py-6 min-h-screen">
      {/* Header */}
      <h1 className="md:text-xl text-lg bg-white shadow rounded p-2 h-11 font-bold text-gray-800 mb-3">
        Search : <span className="text-orange-500">{keyword}</span>
      </h1>

      {/* Results List */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-2xl font-semibold text-center w-full py-10">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((product) => (
            <Link to={`/${product.category}/${product.name}`}>
              <ProductCard data={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

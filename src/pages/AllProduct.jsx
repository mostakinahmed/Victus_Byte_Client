import React, { useState } from "react";
import { motion } from "framer-motion";
import LeftSide from "../components/All Product/LeftSide";
import RightSide from "../components/All Product/RightSide";

const AllProduct = () => {
  const [newData, setNewData] = useState(null);

  const onFilterData = (data) => {
    setNewData(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-[1400px] font-sans md:mt-[55px] mt-[45px] mx-auto md:py-6 py-3 min-h-screen"
    >
      <div className="flex flex-col md:mx-4 mx-2 lg:pt-6 lg:flex-row gap-2">
        {/* Left: Filter Sidebar */}
        <LeftSide onFilter={onFilterData} />

        {/* Right: Product Section */}
        <RightSide filterData={newData} />
      </div>
    </motion.div>
  );
};

export default AllProduct;

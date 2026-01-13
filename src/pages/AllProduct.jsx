import React, { useState } from "react";
import LeftSide from "../components/All Product/LeftSide";
import RightSide from "../components/All Product/RightSide";

const AllProduct = () => {
  const [newData, setNewData] = useState(null);

  const onFilterData = (data) => {
    setNewData(data);
  };

  return (
    <>
      <div className="max-w-[1400px] font-sans md:mt-[55px] mt-[45px] mx-auto md:py-6 py-3 min-h-screen">
        <div className="flex flex-col md:mx-4 mx-2 lg:pt-6 lg:flex-row gap-2">
          {/* Left: Filter Sidebar */}
          <LeftSide onFilter={onFilterData} />

          {/* Right: Product Section */}
          <RightSide filterData={newData} />
        </div>
      </div>
    </>
  );
};

export default AllProduct;

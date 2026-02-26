import React from "react";
import { Cpu, Baby, Zap, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileCategoryRow = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Electronics",
      icon: <Cpu size={22} />,
      color: "from-blue-500 to-blue-600",
      path: "/electronics",
    },
    {
      name: "Kids Zone",
      icon: <Baby size={22} />,
      color: "from-purple-500 to-pink-500",
      path: "/kids-zone",
    },
    {
      name: "Daily Deals",
      icon: <Zap size={22} />,
      color: "from-orange-400 to-yellow-500",
      path: "/daily-deals",
    },
  ];

  return (
    <div className="md:hidden px-3 mt-3">
      <div className="flex flex-col gap-2">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className={`bg-gradient-to-r ${cat.color} rounded-xl p-3 flex items-center justify-between shadow-md active:scale-95 transition cursor-pointer`}
          >
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white/20 p-2 rounded-lg">{cat.icon}</div>

              <div>
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs text-white/80">Shop Now</p>
              </div>
            </div>

            <ChevronRight className="text-white" size={18} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCategoryRow;
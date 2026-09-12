import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";

export const Breadcrumb = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define routes where the breadcrumb should be completely hidden
  const hiddenRoutes = [
    "/",
    "/checkout/purchase",
    "/checkout/cart",
    "/signup",
    "/signin",
    "/electronics",
    "/kids-zone",
    "/daily-accessories",
    "/offer",
    "/forgot-password",
    "/contact-us"
  ];

  // If the current path matches any hidden route, render nothing
  if (hiddenRoutes.includes(currentPath)) {
    return null;
  }

  // 2. Route prefixes that have dynamic parameters (like search keywords or IDs)
  const dynamicHiddenPrefixes = [
    "/search-result/",
    // Add other dynamic paths here if needed, e.g., "/product-details/"
  ];

  // Check if current path matches exact routes OR starts with any dynamic prefix
  const isHidden =
    hiddenRoutes.includes(currentPath) ||
    dynamicHiddenPrefixes.some((prefix) => currentPath.startsWith(prefix));

  if (isHidden) {
    return null;
  }

  // Split path into segments for dynamic tracking
  const pathnames = currentPath.split("/").filter((x) => x);

  return (
    <nav className="max-w-[1400px] font-light mt-13 -mb-2 md:-mb-0 md:px-6 px-2.5 mx-auto w-full flex items-center text-xs md:text-sm md:mt-32 text-black/95 py-3">
      <ol className="flex items-center flex-wrap gap-1">
        {/* Home Link */}
        <li>
          <Link
            to="/"
            className="hover:underline transition-colors flex items-center"
          >
            <FiHome size={16} />
          </Link>
        </li>

        {pathnames.length > 0 && <span className="text-slate-500">/</span>}

        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          const formattedName = decodeURIComponent(value)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <React.Fragment key={routeTo}>
              <li>
                {isLast ? (
                  <span className="text-black/70 mt-1 truncate max-w-[200px] md:max-w-xs inline-block">
                    {formattedName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="hover:underline transition-colors"
                  >
                    {formattedName}
                  </Link>
                )}
              </li>
              {!isLast && <span className="text-slate-400">/</span>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

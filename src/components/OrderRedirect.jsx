import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderRedirect = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRealUrl = async () => {
      try {
        // Hit your API subdomain to get the originalUrl
        const { data } = await axios.get(
          `https://api.victusbyte.com/order/${shortId}`,
        );

        if (data.url) {
          window.location.replace(data.url);
        }
      } catch (err) {
        console.error("Link invalid or expired");
        navigate("/track-order"); // Send them to manual search if link fails
      }
    };

    fetchRealUrl();
  }, [shortId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600 font-medium">
        Loading your order details...
      </p>
    </div>
  );
};
export default OrderRedirect;

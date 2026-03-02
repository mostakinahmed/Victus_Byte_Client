import React from "react";
import ProfileSection from "../components/Profile/ProfileSection";
import ProfileCards from "../components/Profile/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import EditProfile from "../components/Profile/EditProfile";

function ProfileHome() {
  const navigate = useNavigate();

  const { card } = useParams();

  // 🔄 Dynamic content based on URL param
  const renderContent = () => {
    switch (card) {
      case "edit-profile":
        return <EditProfile />;
    
      default:
        return <ProfileCards />;
    }
  };

  const homeBtn = () => {
    navigate("/profile/home");
  };

  return (
    <div className="max-w-[1400px] mt-[93px] mx-auto px-4 py-6 min-h-screen">
      <div className="bg-gray-800 w-full rounded-t-sm">
        <h1
          onClick={homeBtn}
          className="text-2xl font-semibold py-2 pl-3 text-white"
        >
          My Dashboard
        </h1>
      </div>

      <div className="bg-white rounded-b-md shadow-md p-6 flex flex-col md:flex-row gap-6">
        <ProfileSection />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
}

export default ProfileHome;

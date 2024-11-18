"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/Footer";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const api = axios.create({
          baseURL: "http://localhost:5000",
          withCredentials: true,
        });

        const response = await api.get("/auth/profile");
        const image = response.data.profile.image;
        if (image) {
          response.data.profile.image = `http://localhost:5000${image}`;
        }

        if (response.status === 200) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">{error}</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">No profile data available.</div>
      </div>
    );
  }

  const { name, email, profile } = profileData;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Profile Content */}
      <main className="md:ml-64 transition-all duration-300 relative">
        {/* Profile Header with Image */}
        <div className="bg-pink-700 h-38 md:h-60 relative shadow-lg rounded-b-xl">
          <div className="absolute left-1/2 md:left-8 bottom-0 transform -translate-x-1/2 md:translate-x-0 translate-y-1/2">
            


<img
      src={profile.image || '/avatar.png'}  // Fallback to '/avatar.png' if profileImage is null
      alt="Profile"
      className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full object-cover border-4 border-white shadow-md"
      onError={(e) => (e.currentTarget.src = '/avatar.png')} // Fallback to avatar if image fails to load
    />
          </div>
        </div>

        {/* Spacing for profile image */}
        <div className="mt-24 md:mt-40" />

        {/* Profile Details Section */}
        <div className="p-4 md:p-12 border-b bg-white rounded-lg shadow-sm mx-4 md:mx-12">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {`${profile.firstName || ""} ${profile.lastName || ""}`}
              </h1>
              <p className="text-gray-600">{profile.accountType || "Dancer"}</p>
              <p className="text-gray-600">{profile.location || "Lagos, Nigeria"}</p>
            </div>
            <Button className="bg-pink-700 text-white hover:bg-pink-600 w-full md:w-auto rounded-lg shadow-md transition-all">
              <a href={`mailto:${email}`} className="w-full text-center">
                Contact
              </a>
            </Button>
          </div>

          {/* Bio */}
          <div className="mt-6 md:mt-4">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Bio</h2>
            <p className="text-justify text-gray-700">
              {profile.bio || "No bio available"}
            </p>
          </div>
        </div>

        {/* Additional Profile Info */}
        <div className="p-4 md:p-12 border mt-8 md:mt-20 bg-white rounded-lg shadow-sm mx-4 md:mx-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Dance Style</h2>
              <p className="text-gray-700">{profile.danceStyle || "Afrobeats | Classic | Contemporary"}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Experience Level</h2>
              <p className="text-gray-700">{profile.experienceLevel || "Professional"}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Portfolio</h2>
              {profile.portfolio ? (
                <a
                  href={`http://localhost:5000${profile.portfolio}`}
                  className="text-blue-500 hover:underline"
                >
                  Click To View
                </a>
              ) : (
                <span className="text-gray-500">No portfolio available</span>
              )}
            </div>
          </div>
        </div>

        <div className="h-16 md:h-0" />
      </main>

      <div className="mt-20" />

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default ProfilePage;

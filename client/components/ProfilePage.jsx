import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import ProfileDetails from "@/components/ui/ProfileDetails";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
  }

  const { name, email, profile } = profileData;

  return (
    <div className="flex min-h-screen">
      <Sidebar profileImage={profile.image} />
      <main className="ml-64 flex-grow bg-white">
        <ProfileDetails name={name} email={email} image={profile.image} />
      </main>
    </div>
  );
};

export default ProfilePage;

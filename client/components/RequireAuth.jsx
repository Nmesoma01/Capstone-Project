// components/RequireAuth.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProfileData } from "@/utils/auth";

const RequireAuth = (WrappedComponent) => {
  return (props) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const data = await fetchProfileData();
          setProfileData(data);
        } catch (err) {
          setError("Unauthorized. Please login to continue.");
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">Oops! An Error Occurred</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full p-2 bg-pink-500 text-white font-bold hover:bg-blue-600 transition"
            >
              Login
            </button>
          </div>
        </div>
      );
    }
    

    if (!profileData) {
      router.push("/login");
      return null;
    }

    return <WrappedComponent profileData={profileData} {...props} />;
  };
};

export default RequireAuth;

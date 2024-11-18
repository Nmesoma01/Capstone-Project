'use client';

import { useState, useEffect } from "react";
import { Home, Briefcase, Settings, User, Archive, Search, Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import axios from "axios"
import { useSearch } from '@/contexts/SearchContext';

export default function Sidebar() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Use the search context instead of local state
  const { searchQuery, searchFilters, updateSearch } = useSearch();

  // Filter options
  const accountTypes = ['Dancer', 'Recruiter'];
  const locations = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];  
  const danceStyles = [
    'Traditional', 'Hip Hop', 'Contemporary', 'Classic', 'Afrobeats',
    'Street', 'Cultural', 'Partner Dance [Kizomba and Salsa]',
    'Ballet and Classical Dance', 'Dance Fitness', 'Folk Dance'
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const api = axios.create({
          baseURL: "http://localhost:5000",
          withCredentials: true,
        });

        const response = await api.get("/auth/profile");
        if (response.data.profile.image) {
          response.data.profile.image = `http://localhost:5000${response.data.profile.image}`;
        }

        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const navigationItems = [
    { icon: Home, label: "Home", link: "/" },
    { icon: User, label: "Mentorship", link: "/mentorship" },
    { icon: Briefcase, label: "Jobs", link: "/dashboard" },
    { icon: Archive, label: "Resources", link: "/resources" },
    { icon: Settings, label: "Settings", link: "/setting" },
  ];

  // Handle search with filters
  const handleSearch = () => {
    updateSearch(searchQuery, searchFilters);
  };

  // Handle search input change
  const handleSearchInput = (e) => {
    updateSearch(e.target.value, searchFilters);
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    const newFilters = { ...searchFilters, [key]: value };
    updateSearch(searchQuery, newFilters);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      if (isOpen && sidebar && !sidebar.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed text-pink-500 top-4 left-4 z-50 p-2 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          w-64 bg-gray-100 h-[65vh] fixed left-0 top-0 p-6 overflow-y-auto
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          z-40
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0">
            <Image
              src="/logo-white.png?height=50&width=200"
              alt="ArtsKhonnect Logo"
              width={200}
              height={50}
              className="mb-4"
            />
            
            {/* Search Section */}
            <div className="space-y-2 mb-4">
              {/* Search Input */}
              <div className="relative">
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 w-full bg-white"
                  value={searchQuery}
                  onChange={handleSearchInput}
                />
              </div>
              
              {/* Filter Toggle */}
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
                <ChevronDown 
                  className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  size={16}
                />
              </Button>

              {/* Filter Options */}
              {showFilters && (
                <div className="space-y-2 p-2 bg-white rounded-md shadow-sm">
                  <Select
                    value={searchFilters.accountType}
                    onValueChange={(value) => handleFilterChange('accountType', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={searchFilters.location}
                    onValueChange={(value) => handleFilterChange('location', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location.toLowerCase()}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={searchFilters.danceStyle}
                    onValueChange={(value) => handleFilterChange('danceStyle', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Dance Style" />
                    </SelectTrigger>
                    <SelectContent>
                      {danceStyles.map((style) => (
                        <SelectItem key={style} value={style.toLowerCase()}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    className="w-full"
                    onClick={handleSearch}
                  >
                    Apply Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-4">
              {navigationItems.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <item.icon className="text-black" size={20} />
                  <Link 
                    href={item.link} 
                    className="text-black hover:text-gray-600"
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex-shrink-0 mt-4 pt-4 border-t">
            {!loading && !error && profileData && (
              <div className="flex items-center space-x-3">
             
                <img
      src={profileData.profile.image || '/avatar.png'}  // Fallback to '/avatar.png' if profileImage is null
      alt="Profile"
      className="w-8 h-8 rounded-full object-cover"
      onError={(e) => (e.currentTarget.src = '/avatar.png')} // Fallback to avatar if image fails to load
    />
                
                <Link 
                  href="/profile" 
                  className="text-black hover:text-gray-600"
                  onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                >
                  {"My Profile"}
                </Link>
              </div>
            )}
            
            {loading && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
              </div>
            )}
            
            {error && (
              <div className="flex items-center space-x-3">
                <User className="text-black" size={20} />
                <Link 
                  href="/profile" 
                  className="text-black hover:text-gray-600"
                  onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden mt-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
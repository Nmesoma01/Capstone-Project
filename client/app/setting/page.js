"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Menu, X, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Footer from '@/components/Footer'
import RequireAuth from '@/components/RequireAuth'


function PublicProfileSettings() {
  const router = useRouter();
  
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);
  
  // Form state with proper typing
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    accountType: '',
    location: '',
    danceStyle: '',
    experienceLevel: '',
    bio: '',
    portfolioUrl: '',
  });

  // API client setup with interceptors
  const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const { data } = await axios.post('http://localhost:5000/auth/refresh-token', {
            refreshToken,
          });

          localStorage.setItem('authToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          router.push('/login');
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  // Profile data fetching function
  const fetchProfileData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('/auth/profile');
      
      if (response.status === 200) {
        const { profile } = response.data;
        
        // Update form data with profile information
        setFormData({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          accountType: profile.accountType || '',
          location: profile.location || '',
          danceStyle: profile.danceStyle || '',
          experienceLevel: profile.experienceLevel || '',
          bio: profile.bio || '',
          portfolioUrl: profile.portfolio || '',
        });

        // Set profile image if exists
        if (profile.image) {
          setProfileImage(`http://localhost:5000${profile.image}`);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile data';
      setError(errorMessage);
      console.error('Error fetching profile:', error);
      
      if (error.response?.status === 401) {
        router.push('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
  
      // Updated to use the correct field name
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePortfolioChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 10 * 1024 * 1024) {
        setError('Portfolio file size should be less than 10MB');
        return;
      }
  
      // Updated to use the correct field name
      setPortfolioFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);
    
    try {
      const formDataObj = new FormData();
      
      // Append all text form fields
      Object.entries(formData).forEach(([key, value]) => {
        // Don't append the portfolioUrl to form data as it's just for display
        if (value !== null && value !== undefined && value !== '' && key !== 'portfolioUrl') {
          formDataObj.append(key, value);
        }
      });
  
      // Append files with the correct field names to match backend
      if (profileImageFile) {
        formDataObj.append('profileImage', profileImageFile);
      }
  
      if (portfolioFile) {
        formDataObj.append('portfolioFile', portfolioFile);
      }
  
      // Optional: Log form data contents for debugging
      for (let pair of formDataObj.entries()) {
        console.log('Form Data:', pair[0] + ': ' + pair[1]);
      }
  
      const response = await api.post('/auth/profile', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('Profile updated successfully!');
        router.push('/profile');
      }
    } catch (error) {
      let errorMessage = 'Failed to update profile';
      
      // Handle specific error cases
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setError(errorMessage);
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // First attempt to call the logout endpoint
      await api.post('/auth/logout');
      
      // Clear all auth-related items from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      
      // Clear any other auth-related items you might have
      localStorage.clear(); // Optional: removes all localStorage items
      
      // Clear any cookies if they exist
      document.cookie.split(';').forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });
      
      // Force redirect to login page
      window.location.href = '/login';  // Using window.location.href instead of router.push for a full page refresh
    } catch (error) {
      console.error('Error during logout:', error);
      
      // Even if the API call fails, clear local storage and redirect
      localStorage.clear();
      window.location.href = '/login';
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <Image
          src="/logo-white.png?height=50&width=200"
          alt="ArtsKhonnect Logo"
          width={200}
          height={50}
          className="mb-4"
        />
        <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        <aside className={`w-full lg:w-80 bg-white border-r border-gray-200 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <h2 className="font-bold p-4">Settings</h2>
          <Button
            className="w-3/4 mx-auto bg-black text-white rounded-none py-2 px-4 text-left"
            onClick={() => router.push('/profile')}
          >
            Public Profile
          </Button>
          <br />
          <Button
            className="w-3/4 mx-auto bg-pink-500 text-white hover:bg-pink-600 rounded-none py-2 px-4 mt-4 text-left"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </aside>

        <main className="flex-1 p-4 lg:p-8 max-w-5xl">
          <h1 className="text-2xl lg:text-3xl font-bold mb-6">Public Profile</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

<div className="mb-8 flex flex-col items-center">
  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-4">
    <img
      src={profileImage || '/avatar.png'}  // Fallback to '/avatar.png' if profileImage is null
      alt="Profile"
      className="w-full h-full object-cover"
      onError={(e) => (e.currentTarget.src = '/avatar.png')} // Fallback to avatar if image fails to load
    />
  </div>
  <div className="flex flex-col sm:flex-row gap-2">
    <Button variant="secondary" className="bg-pink-500 text-white hover:bg-pink-600">
      <Label htmlFor="profileImage" className="cursor-pointer">
        Change Picture
      </Label>
    </Button>
    <Input
      id="profileImage"
      name="profileImage"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleImageChange}
    />
  </div>
</div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={formData.firstName} 
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accountType">Account Type</Label>
              <Select 
                value={formData.accountType}
                onValueChange={(value) => handleSelectChange('accountType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Account Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dancer">Dancer</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={formData.location} 
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="danceStyle">Dance Style</Label>
              <Select 
                value={formData.danceStyle}
                onValueChange={(value) => handleSelectChange('danceStyle', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dance style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="hipHop">Hip Hop</SelectItem>
                  <SelectItem value="contemporary">Contemporary</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="afrobeats">Afrobeats</SelectItem>
                  <SelectItem value="street">Street</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="partnerDance">Partner Dance [Kizomba and Salsa]</SelectItem>
                  <SelectItem value="ballet">Ballet and Classical Dance</SelectItem>
                  <SelectItem value="danceFitness">Dance Fitness</SelectItem>
                  <SelectItem value="folk">Folk Dance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select 
                value={formData.experienceLevel}
                onValueChange={(value) => handleSelectChange('experienceLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                value={formData.bio} 
                onChange={handleInputChange}
              />
            </div>

            <div>
  <Label htmlFor="portfolioFile">
    Upload Portfolio
  </Label>
  <Input 
    type="file" 
    id="portfolioFile"
    name="portfolioFile" 
    accept=".pdf,.doc,.docx" 
    onChange={handlePortfolioChange}
  />
  {formData.portfolioUrl && (
    <p className="mt-2 text-sm text-gray-600">
      Current portfolio: <a 
        href={`http://localhost:5000${formData.portfolioUrl}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-pink-500 hover:text-pink-600"
      >
        View
      </a>
    </p>
  )}
</div>

            <Button 
              type="submit" 
              variant="default" 
              className="bg-pink-500 text-white"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </main>
      </div>
            <div className="mt-20" />

      <Footer />
    </div>
  );
}


export default RequireAuth(PublicProfileSettings);
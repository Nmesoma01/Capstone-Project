'use client'

import { useState } from 'react'
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
import { Menu, X } from 'lucide-react'

export default function PublicProfileSettings() {
  const [profileImage, setProfileImage] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    (<div className="min-h-screen bg-white">
      <header className="bg-black p-4 flex justify-between items-center">
        <img
          src="/placeholder.svg?height=40&width=150"
          alt="Arts KHonnect Logo"
          className="h-10" />
        <button className="lg:hidden text-white" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </header>
      <div className="flex flex-col lg:flex-row">
        <aside
          className={`w-full lg:w-64 p-4 bg-white lg:block ${isSidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-50 lg:static lg:z-auto`}>
          <div className="flex justify-between items-center lg:hidden mb-4">
            <h2 className="text-2xl font-bold">Settings</h2>
            <button onClick={toggleSidebar}>
              <X size={24} />
            </button>
          </div>
          <nav>
            <Button
              variant="secondary"
              className="w-full justify-start bg-black text-white mb-2">Public Profile</Button>
          </nav>
        </aside>
        <main className="flex-1 p-4 lg:p-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-6">Public Profile</h1>
          <div className="mb-8 flex flex-col items-center">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-4">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="secondary" className="bg-pink-500 text-white hover:bg-pink-600">
                <Label htmlFor="picture-upload" className="cursor-pointer">
                  Change Picture
                </Label>
              </Button>
              <Input
                id="picture-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange} />
              <Button variant="secondary" className="bg-gray-300 text-black hover:bg-gray-400">
                Delete Picture
              </Button>
            </div>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" />
              </div>
            </div>
            <div>
              <Label htmlFor="accountType">Account Type</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dancer">Dancer</SelectItem>
                  <SelectItem value="choreographer">Choreographer</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" />
            </div>
            <div>
              <Label htmlFor="danceStyle">Dance Style</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select dance style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ballet">Ballet</SelectItem>
                  <SelectItem value="contemporary">Contemporary</SelectItem>
                  <SelectItem value="hiphop">Hip Hop</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="portfolio">Portfolio</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="portfolio"
                  placeholder="No file chosen"
                  readOnly
                  className="flex-grow" />
                <Button
                  variant="secondary"
                  className="bg-pink-500 text-white hover:bg-pink-600 w-full sm:w-auto">
                  Upload Portfolio
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={4} />
            </div>
            <Button className="w-full bg-pink-500 text-white hover:bg-pink-600">Create Profile</Button>
          </form>
        </main>
      </div>
    </div>)
  );
}
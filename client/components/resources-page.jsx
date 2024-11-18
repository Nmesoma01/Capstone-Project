'use client'

import { Search, Home, Users, Briefcase, BookOpen, Settings, User } from 'lucide-react'

const categories = [
  { title: 'Traditional Dances', image: '/trad.png?height=200&width=300' },
  { title: 'Afrobeat Dance Styles', image: '/afrobeat.png?height=200&width=300' },
  { title: 'Street Dance & Urban Styles', image: '/street.png?height=200&width=300' },
  { title: 'Contemporary & Modern Dance', image: '/contemp.png?height=200&width=300' },
  { title: 'Music Video & Commercial Dance', image: '/music_vid.png?height=200&width=300' },
  { title: 'Dance Choreography & Creative Direction', image: '/dance.png?height=200&width=300' },
  { title: 'History Of Nigerian Dance', image: '/history.png?height=200&width=300' },
  { title: 'Dance Battles & Competitions', image: '/battle.png?height=200&width=300' },
]

export function ResourcesPage() {
  return (
    (<div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-4">
          <img
            src="/placeholder.svg?height=60&width=180"
            alt="ARTS KONNECT"
            className="mb-8" />
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <nav className="space-y-6">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
              <Users className="h-5 w-5" />
              <span>Mentorship</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
              <Briefcase className="h-5 w-5" />
              <span>Jobs</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
              <BookOpen className="h-5 w-5" />
              <span>Resources</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </nav>
        </div>
        <div className="absolute bottom-4 left-4">
          <a
            href="#"
            className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
            <User className="h-5 w-5" />
            <span>My Profile</span>
          </a>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="bg-pink-600 text-white p-8">
          <h1 className="text-3xl font-bold mb-2">RESOURCES FOR DANCERS AND RECRUITERS</h1>
          <p className="text-lg">Find the right tools and courses to enhance your skills and knowledge in the dance industry</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Select Your Category:</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover" />
                <div className="p-4 bg-pink-600 text-white text-center">
                  <h3 className="font-semibold text-sm">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>)
  );
}
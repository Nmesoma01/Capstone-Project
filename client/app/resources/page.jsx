'use client'

import Footer from '@/components/Footer';
import Sidebar from '@/components/sidebar';
import { Search, Home, Users, Briefcase, BookOpen, Settings, User } from 'lucide-react'
import RequireAuth from '@/components/RequireAuth';

const categories = [
  { 
    title: 'Traditional African Dance Styles', 
    image: '/trad.png?height=200&width=300',
    link: 'https://nigeria.appliedworldwide.com/dance-in-nigeria-its-history-and-how-to-get-started/'
  },
  { 
    title: 'Afrobeats music and Dance Styles', 
    image: '/afrobeat.png?height=200&width=300',
    link: 'https://www.masterclass.com/articles/afrobeat-music-guide'
  },
  { 
    title: 'Street Dance & Urban Styles', 
    image: '/street.png?height=200&width=300',
    link: 'https://www.classcentral.com/course/udemy-hip-hop-dance-for-beginners-32889'
  },
  { 
    title: 'Contemporary & Modern Dance', 
    image: '/contemp.png?height=200&width=300',
    link: 'https://www.classcentral.com/course/craftsy-exploring-movement-in-contemporary-dance-116520'
  },
  { 
    title: 'Music Video & Commercial Dance', 
    image: '/music_vid.png?height=400&width=300',
    link: 'https://www.classcentral.com/classroom/youtube-the-light-and-darkness-in-art-dance-industry-julia-morales-alvarado-tedxyouthatjfkqro-288853'
  },
  { 
    title: 'Dance Choreography & Creative Direction', 
    image: '/dance.png?height=200&width=300',
    link: 'https://www.open.edu/openlearn/education-development/dance-skills/content-section-0'
  },
  { 
    title: 'History Of Nigerian Dance', 
    image: '/history.png?height=200&width=300',
    link: 'https://nigeria.appliedworldwide.com/dance-in-nigeria-its-history-and-how-to-get-started/'
  },
  { 
    title: 'Dance Battles & Competitions', 
    image: '/battle.png?height=200&width=300',
    link: 'https://www.deanza.edu/schedule/class-details.html?crn=23049&y=2024&q=F'
  },
]

function ResourcesPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className="md:ml-64 transition-all duration-300 relative flex-1">
        <div className="bg-pink-600 text-white p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">RESOURCES FOR DANCERS AND RECRUITERS</h1>
          <p className="text-base md:text-lg">Find the right tools and courses to enhance your skills and knowledge in the dance industry</p>
        </div>

        <div className="p-4 md:p-8">
          <div className="relative mb-10 md:mb-20"/>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Select Your Category:</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <a 
                key={index} 
                href={category.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col h-full"
              >
                <div className="relative h-[200px] sm:h-[250px]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-pink-600 text-white text-center mt-auto flex-1 flex items-center justify-center">
                  <h3 className="font-semibold text-xs md:text-sm">{category.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-20 md:mt-40" />
      </main>
      <Footer className="mt-10 md:mt-20" />
    </div>
  );
}

export default RequireAuth(ResourcesPage);

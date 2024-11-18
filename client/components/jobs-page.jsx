'use client';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Home, Users, Briefcase, Book, Settings, User, Search, Instagram, Twitter, Facebook } from "lucide-react"
import Image from "next/image"

const jobs = [
  {
    id: 1,
    title: "Music Producer",
    company: "Mavins Record",
    location: "Lagos, Nigeria",
    description: "We are seeking a talented and creative Music Producer to join our team at Mavins Record. The ideal candidate will have a strong background in music production, excellent technical skills, and a passion for creating hit songs."
  },
  {
    id: 2,
    title: "Sound Engineer",
    company: "Mavins Record",
    location: "Lagos, Nigeria",
    description: "Mavins Record is looking for an experienced Sound Engineer to join our state-of-the-art recording studio. The successful candidate will be responsible for recording, mixing, and mastering audio for various projects."
  },
  {
    id: 3,
    title: "A&R Manager",
    company: "Mavins Record",
    location: "Lagos, Nigeria",
    description: "We are hiring an A&R Manager to discover and develop new musical talent. The ideal candidate will have a keen ear for music, strong industry connections, and the ability to guide artists through the recording process."
  },
]

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    (<div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Image
            src="/placeholder.svg?height=50&width=200"
            alt="ArtsKhonnect Logo"
            width={200}
            height={50}
            className="mb-4" />
          <div className="relative">
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20} />
            <Input type="search" placeholder="Search" className="pl-10 w-full" />
          </div>
        </div>
        <nav className="mt-4">
          {[
            { icon: Home, label: "Home" },
            { icon: Users, label: "Mentorship" },
            { icon: Briefcase, label: "Jobs" },
            { icon: Book, label: "Resources" },
            { icon: Settings, label: "Settings" },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
              <item.icon className="mr-2" size={20} />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-4">
          <a
            href="#"
            className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded-md">
            <User className="mr-2" size={20} />
            <span>My Profile</span>
          </a>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-[#E91E63] text-white p-6">
          <h1 className="text-2xl font-bold">JOBS RECOMMENDED FOR YOU</h1>
          <p>Based on your profile and search history</p>
        </header>
        <div className="p-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedJob(job)}>
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt={`${job.company} Logo`}
                  width={50}
                  height={50}
                  className="mr-4" />
                <div>
                  <h2 className="text-lg font-semibold text-blue-600">{job.title}</h2>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
              </div>
              <Button className="bg-[#E91E63] hover:bg-[#C2185B]">View Job Listing</Button>
            </div>
          ))}
        </div>
      </main>
      {/* Job Description Modal */}
      <Dialog open={selectedJob !== null} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>{selectedJob?.company} - {selectedJob?.location}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>{selectedJob?.description}</p>
          </div>
          <DialogFooter>
            <Button
              className="bg-[#E91E63] hover:bg-[#C2185B]"
              onClick={() => window.open('https://example.com/apply', '_blank')}>
              Apply Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Footer */}
      <footer
        className="absolute bottom-0 right-0 p-4 flex items-center justify-between w-full bg-white shadow-md">
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800"><Instagram size={20} /></a>
          <a href="#" className="text-gray-600 hover:text-gray-800"><Twitter size={20} /></a>
          <a href="#" className="text-gray-600 hover:text-gray-800"><Facebook size={20} /></a>
        </div>
        <div className="text-sm text-gray-600">
          <span className="mr-4">English</span>
          <span className="mr-4">Privacy Policy</span>
          <span>Terms And Conditions</span>
        </div>
        <div className="text-sm text-gray-600">
          READY TO EXPLORE THE <span className="text-[#E91E63] font-bold">WORLD OF DANCE</span> ?
        </div>
      </footer>
    </div>)
  );
}
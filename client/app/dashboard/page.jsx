'use client';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Home, Users, Briefcase, Book, Settings, User, Search } from "lucide-react"
import Image from "next/image"
import Footer from "@/components/Footer"
import Sidebar from "@/components/sidebar";
import RequireAuth from "@/components/RequireAuth";



const jobs = [
  {
    id: 1,
    title: "Contemporary Dancers",
    company: "Mavins Record",
    location: "Lagos, Nigeria",
    description: "We are looking for talented contemporary dancers to join our team at Mavins Record. Must be able to perform various contemporary dance styles and work well in a team environment.",
    applicationPdf: "/cont-dancers.pdf"
  },
  {
    id: 2,
    title: "Afrobeats Dancers",
    company: "Mavins Record",
    location: "Lagos, Nigeria",
    description: "We are looking for talented Afrobeats Dancers to join our team at Mavins Record. Must be able to perform various Afrobeats dance styles and work well in a team environment.",
    applicationPdf: "/afrobeats-dancers.pdf"
  },
  {
    id: 3,
    title: "Atilogwu Dancers",
    company: "Mavins Record",
    location: "Lagos, Nigeria",
    description: "Atilogwu Dancers needed for a music video shoot in Lagos. Must be able to perform traditional Nigerian dance styles and work well in a team environment.",
    applicationPdf: "/atilogwu-dancers.pdf"
  },
]

function Dashboard() {
  const [selectedJob, setSelectedJob] = useState(null)


  const handleApply = (pdfUrl) => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };


  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="md:ml-64 transition-all duration-300 relative flex-1 flex flex-col overflow-hidden">
          <header className="bg-[#E91E63] text-white p-8">
            <h1 className="text-2xl font-bold">JOBS RECOMMENDED FOR YOU</h1>
            <p className="mt-2">Based on your profile and search history</p>
          </header>
          <div className="flex-1 overflow-y-auto p-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md rounded-lg p-8 mb-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 min-h-[160px]"
                onClick={() => setSelectedJob(job)}>
                <div className="flex items-center space-x-6">
                  <Image
                    src="/mavins-logo.png?height=80&width=80"
                    alt={`${job.company} Logo`}
                    width={80}
                    height={80}
                    className="rounded-lg" />
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
                    <p className="text-base text-gray-600">{job.company}</p>
                    <p className="text-base text-gray-600">{job.location}</p>
                  </div>
                </div>
                <Button size="lg" className="bg-[#E91E63] hover:bg-[#C2185B] px-6">View Job Listing</Button>
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
                onClick={() => handleApply(selectedJob?.applicationPdf)}>
                Apply Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RequireAuth(Dashboard)
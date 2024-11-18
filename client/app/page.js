'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/Footer"

export default function LandingComponent() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="Arts Khonnect Collage" 
            className="w-auto h-auto"
          />
        </div>
        <Button
          className="bg-[#D6246E] hover:bg-[#B51E5C] text-white rounded-sm px-4 py-2 text-sm">
          <Link href="/signup">Register Here!</Link>
        </Button>
      </header>
      <main className="flex-grow flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2 aspect-[4/3] relative">
            <img 
              src="/hex-image.png" 
              alt="Arts Khonnect Collage" 
              className="w-auto h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 max-w-md bg-white text-black p-6 rounded-sm">
            <br/>
            <h2 className="text-2xl font-bold mb-4">Welcome To <span className="text-[#D6246E]">ArtsKhonnect!</span></h2>
            <p className="text-lg leading-relaxed">
              <b>ArtsKhonnect</b> is an exclusive platform built for emerging Nigerian dancers, offering a comprehensive range of
              services to support their growth and success in the dance industry. Beyond just connecting dancers with
              job opportunities, ArtsKhonnect provides mentorship programs, offering guidance from seasoned
              professionals, and access to an extensive library of dance resources including tutorials and courses.
              Recruiters can also use the platform to post job listings and easily find top-tier talent for performances, music
              videos, and events. ArtsKhonnect is the ultimate solution for dancers and recruiters to network, learn, and
              collaborate in the Nigerian dance space.
            </p>
            <br/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
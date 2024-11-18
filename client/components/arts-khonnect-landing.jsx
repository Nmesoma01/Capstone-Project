'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter, Facebook, Globe } from "lucide-react"

export function ArtsKhonnectLandingComponent() {
  return (
    (<div className="min-h-screen bg-black text-white flex flex-col">
      <header className="flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center space-x-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Arts Khonnect Logo"
            width={40}
            height={40}
            className="bg-white" />
          <span className="text-lg font-bold">ARTS KHONNECT</span>
        </div>
        <Button
          className="bg-[#D6246E] hover:bg-[#B51E5C] text-white rounded-sm px-4 py-2 text-sm">
          Register Here!
        </Button>
      </header>
      <main className="flex-grow flex items-center justify-center p-4 md:p-6">
        <div
          className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2 aspect-[4/3] relative">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Arts Khonnect Showcase"
              layout="fill"
              objectFit="cover" />
          </div>
          <div className="w-full md:w-1/2 max-w-md bg-white text-black p-6 rounded-sm">
            <h2 className="text-2xl font-bold mb-4">Welcome To <span className="text-[#D6246E]">ArtsKhonnect!</span></h2>
            <p className="text-sm leading-relaxed">
              ArtsKhonnect is an exclusive platform built for emerging Nigerian dancers, offering a comprehensive range of
              services to support their growth and success in the dance industry. Beyond just connecting dancers with
              job opportunities, ArtsKhonnect provides mentorship programs, offering guidance from seasoned
              professionals, and access to an extensive library of dance resources including tutorials and courses.
              Recruiters can also use the platform to post job listings and easily find top-tier talent for performances, music
              videos, and events. ArtsKhonnect is the ultimate solution for dancers and recruiters to network, learn, and
              collaborate in the Nigerian dance space.
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-white text-black py-4 md:py-6">
        <div
          className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-6">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" aria-label="Instagram">
              <Instagram className="w-6 h-6 text-[#D6246E]" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6 text-[#D6246E]" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="w-6 h-6 text-[#D6246E]" />
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p className="font-bold mb-2 text-sm">READY TO EXPLORE THE <span className="text-[#D6246E]">WORLD OF DANCE</span> ?</p>
            <div className="flex justify-center md:justify-end space-x-4 text-xs">
              <Link href="#" className="hover:underline flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                English
              </Link>
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:underline">Terms And Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>)
  );
}
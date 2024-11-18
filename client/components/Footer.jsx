import Link from "next/link"
import { Instagram, Twitter, Facebook, Globe } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <>
      {/* Spacer div to prevent content from being hidden under fixed footer */}
      <div className="h-20 md:h-24" />
      
      <footer className="bg-white text-black py-4 md:py-6 fixed bottom-0 left-0 right-0 border-t border-gray-200 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-6">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" aria-label="Instagram">
            <Image src="/instagram.png" alt="instagram photo"width={30} height={30} />
            </Link>
            <Link href="#" aria-label="Twitter">
            <Image src="/twitter.png" alt="twitter photo"width={30} height={30} />

            </Link>
            <Link href="#" aria-label="Facebook">
            <Image src="/facebook.png" alt="facebook photo"width={30} height={30} />

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
    </>
  )
}
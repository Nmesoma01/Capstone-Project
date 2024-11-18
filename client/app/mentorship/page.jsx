'use client'

import { useState } from 'react'
import { Menu, X, Search, Home, Briefcase, Users, Archive, FileText, Settings, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Sidebar from '@/components/sidebar'
import Footer from '@/components/Footer'
import RequireAuth from '@/components/RequireAuth'

function TalentMentorshipForm() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    danceStyle: '',
    experienceLevel: '',
    yearsOfExperience: '',
    portfolioLinks: '',
    mentorshipFocus: [],
    goals: '',
    frequency: '',
    preferredDays: '',
    preferredTimes: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target || e;
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      mentorshipFocus: checked
        ? [...prevState.mentorshipFocus, value]
        : prevState.mentorshipFocus.filter(item => item !== value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/mentorship-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      const data = await response.json();
      
      if (data.success) {
        alert('Form submitted successfully!');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          danceStyle: '',
          experienceLevel: '',
          yearsOfExperience: '',
          portfolioLinks: '',
          mentorshipFocus: [],
          goals: '',
          frequency: '',
          preferredDays: '',
          preferredTimes: '',
        });
      } else {
        alert(data.error || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Form submission failed. Please try again.');
    }
  };
  

  const handlePortfolioChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPortfolioFile(e.target.files[0]);  // Set portfolio file
    }
  };

  return (
    (<div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="md:ml-64 transition-all duration-300 relative">
        <header className="bg-pink-600 text-white p-4">
          <div className="flex justify-between items-center">
            
            
            <h1 className="text-2xl font-bold">JOIN OUR TALENT MENTORSHIP PROGRAM</h1>
            
          </div>
          <p className="text-sm mt-2">Unlock your potential with personalized guidance from experienced mentors!</p>
        </header>

        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Welcome To Our Talent Mentorship Program!</h2>
            <p className="text-gray-600">
              Our mentorship program is designed to help talented individuals like you unlock new opportunities and grow in your craft. By connecting you with
              experienced mentors, we aim to provide personalized guidance, skill development, and career advice tailored to your unique needs.
            </p>
            <p className="text-gray-600 mt-2">
              Please fill out the form below so we can understand your goals and match you with the right mentor. We look forward to supporting your journey!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Personal Information */}
            <div className="bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 bg-pink-600 text-white p-2">Section 1: Personal Information</h3>
              <div className="p-4 space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required />
                </div>
              </div>
            </div>

            {/* Section 2: Talent Information */}
            <div className="bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 bg-pink-600 text-white p-2">Section 2: Talent Information</h3>
              <div className="p-4 space-y-4">
                <div>
                  <Label htmlFor="danceStyle">Primary Dance Style</Label>
                  <Select
                    name="danceStyle"
                    onValueChange={(value) => handleInputChange({ target: { name: 'danceStyle', value } })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a dance style" />
                    </SelectTrigger>
                    <SelectContent>
  <SelectItem value="Traditional">Traditional</SelectItem>
  <SelectItem value="Hip Hop">Hip Hop</SelectItem>
  <SelectItem value="Contemporary">Contemporary</SelectItem>
  <SelectItem value="Classic">Classic</SelectItem>
  <SelectItem value="Afrobeats">Afrobeats</SelectItem>
  <SelectItem value="Street">Street</SelectItem>
  <SelectItem value="Cultural">Cultural</SelectItem>
  <SelectItem value="Partner Dance [Kizomba and Salsa]">Partner Dance [Kizomba and Salsa]</SelectItem>
  <SelectItem value="Ballet and Classical Dance">Ballet and Classical Dance</SelectItem>
  <SelectItem value="Dance Fitness">Dance Fitness</SelectItem>
  <SelectItem value="Folk Dance">Folk Dance</SelectItem>
</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    name="experienceLevel"
                    onValueChange={(value) => handleInputChange({ target: { name: 'experienceLevel', value } })}>
                    <SelectTrigger className="w-full">
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
                  <Label htmlFor="yearsOfExperience">Years Of Experience (Optional)</Label>
                  <Input
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange} />
                </div>
                <div>
              <Label htmlFor="portfolio">Upload Portfolio</Label>
              <Input type="file" id="portfolio" accept=".pdf,.doc,.docx" onChange={handlePortfolioChange} />
            </div>
              </div>
            </div>

            {/* Section 3: Mentorship Focus */}
            <div className="bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 bg-pink-600 text-white p-2">Section 3: Mentorship Focus</h3>
              <div className="p-4 space-y-4">
                <Label>What Area Of Mentorship Are You Seeking?</Label>
                <div className="space-y-2">
                  {['Career Guidance', 'Skill Improvement (E.G., Choreography, Technique)', 'Portfolio/Performance Review', 'Audition Preparation', 'Networking/Industry Connections'].map((focus) => (
                    <div key={focus} className="flex items-center">
                      <Checkbox
                        id={focus}
                        name="mentorshipFocus"
                        value={focus}
                        checked={formData.mentorshipFocus.includes(focus)}
                        onCheckedChange={(checked) => handleCheckboxChange({ target: { value: focus, checked } })} />
                      <label htmlFor={focus} className="ml-2">{focus}</label>
                    </div>
                  ))}
                </div>
                <div>
                  <Label htmlFor="goals">Short Description Of Your Goals</Label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows={4}></textarea>
                </div>
              </div>
            </div>

            {/* Section 4: Availability */}
            <div className="bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 bg-pink-600 text-white p-2">Section 4: Availability</h3>
              <div className="p-4 space-y-4">
                <div>
                  <Label htmlFor="frequency">Preferred Frequency For Mentorship Sessions</Label>
                  <Select
                    name="frequency"
                    onValueChange={(value) => handleInputChange({ target: { name: 'frequency', value } })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredDays">Preferred Days</Label>
                  <Select
                    name="preferredDays"
                    onValueChange={(value) => handleInputChange({ target: { name: 'preferredDays', value } })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select preferred days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredTimes">Preferred Times</Label>
                  <Input
                    id="preferredTimes"
                    name="preferredTimes"
                    value={formData.preferredTimes}
                    onChange={handleInputChange}
                    placeholder="e.g., Evenings after 6 PM"
                    required />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white">SUBMIT FORM</Button>
          </form>
        </div>

       <Footer />
      </main>
    </div>)
  );
}
export default RequireAuth(TalentMentorshipForm)